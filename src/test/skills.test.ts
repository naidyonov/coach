import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import * as fs from 'fs';
import * as path from 'path';

interface ParsedSkillFrontmatter {
  name: string;
  description: string;
}

export function parseSkillFrontmatter(content: string): ParsedSkillFrontmatter | null {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;

  const yamlBlock = match[1];
  const nameMatch = yamlBlock.match(/^name:\s*(.+)$/m);
  const descMatch = yamlBlock.match(/^description:\s*(.+)$/m);

  if (!nameMatch || !descMatch) return null;

  return {
    name: nameMatch[1].trim(),
    description: descMatch[1].trim(),
  };
}

describe('Agent Skills Definitions & Invariants', () => {
  const skillsDir = path.resolve(__dirname, '../../.agents/skills');

  it('contains expected registered skills: auto-ship and delegate-to-flash', () => {
    expect(fs.existsSync(skillsDir)).toBe(true);
    const entries = fs.readdirSync(skillsDir);
    expect(entries).toContain('auto-ship');
    expect(entries).toContain('delegate-to-flash');
  });

  it('every skill directory contains a well-formed SKILL.md with valid YAML frontmatter', () => {
    const entries = fs.readdirSync(skillsDir, { withFileTypes: true });
    const skillFolders = entries.filter((e) => e.isDirectory()).map((e) => e.name);

    expect(skillFolders.length).toBeGreaterThanOrEqual(2);

    for (const folder of skillFolders) {
      const skillFilePath = path.join(skillsDir, folder, 'SKILL.md');
      expect(fs.existsSync(skillFilePath), `Missing SKILL.md in ${folder}`).toBe(true);

      const content = fs.readFileSync(skillFilePath, 'utf8');
      const parsed = parseSkillFrontmatter(content);

      expect(parsed, `Invalid frontmatter in ${folder}/SKILL.md`).not.toBeNull();
      expect(parsed?.name).toBe(folder);
      expect(parsed?.description.length).toBeGreaterThan(15);
      expect(content).toContain('# ');
    }
  });

  describe('Property-Based Tests for Skill Parsing & Invariant Guarantees', () => {
    it('roundtrip parses valid skill frontmatter for arbitrary names and descriptions', () => {
      // Property: any valid alphanumeric-with-hyphens skill name and non-whitespace trimmed description
      // formats into frontmatter and can be parsed back idempotently.
      fc.assert(
        fc.property(
          fc.stringMatching(/^[a-z0-9]+(-[a-z0-9]+)*$/),
          fc
            .string({ minLength: 1, maxLength: 200 })
            .map((s) => s.trim())
            .filter((s) => s.length > 0 && !s.includes('\n') && !s.includes('\r')),
          (name, description) => {
            const rawContent = `---\nname: ${name}\ndescription: ${description}\n---\n\n# Header\nContent here.`;
            const parsed = parseSkillFrontmatter(rawContent);

            expect(parsed).not.toBeNull();
            expect(parsed?.name).toBe(name);
            expect(parsed?.description).toBe(description);
          }
        )
      );
    });

    it('returns null for content missing frontmatter delimiters', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 500 }).filter((s) => !s.includes('---')),
          (invalidContent) => {
            const parsed = parseSkillFrontmatter(invalidContent);
            expect(parsed).toBeNull();
          }
        )
      );
    });
  });
});
