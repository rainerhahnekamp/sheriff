import { matchesGlob } from '../internal/matches-glob';
import {describe, it, expect}  from 'vitest'

describe('matchesGlob', () => {
  it('matches exact path', () => {
    expect(matchesGlob('src/app/index.ts', 'src/app/index.ts')).toBe(true);
    expect(matchesGlob('src/app/index.ts', 'src/app')).toBe(false);
    expect(matchesGlob('src/app/index.ts', 'src/app/')).toBe(false);
  });

  it('does not match when path is different', () => {
    expect(matchesGlob('src/app/index.ts', 'src/app/main.ts')).toBe(false);
    expect(matchesGlob('src/apps', 'src/app')).toBe(false);
    expect(matchesGlob('src/app', 'src/apps')).toBe(false);
  });

  it('matches multiple chars with *', () => {
    expect(matchesGlob('src/app/index.ts', 'src/app/*.ts')).toBe(true);
    expect(matchesGlob('src/app/index.ts', 'src/*/index.ts')).toBe(true);
    expect(matchesGlob('src/app/index.ts', 'src/app/*')).toBe(true);
  });

  it('matches with only one char with ?', () => {
    expect(matchesGlob('src/app/index.ts', 'src/app/inde?.ts')).toBe(true);
    expect(matchesGlob('src/app/index.ts', 'src/app/ind?x.ts')).toBe(true);
    expect(matchesGlob('src/app/index.ts', 'src/app/ind?.ts')).toBe(false);
  });

  it('matches with underscore directory', () => {
    expect(matchesGlob('src/app/_lib/main.ts', '**/_*/**')).toBe(true)
    expect(matchesGlob('src/app/lib/_main.ts', '**/_*/**')).toBe(false)
  })

  it('matches only files starting with underscore', () => {
    expect(matchesGlob('src/app/_lib/main.ts', '**/_*/**')).toBe(true)
    expect(matchesGlob('src/app/lib/_main.ts', '**/_*/**')).toBe(false)
    expect(matchesGlob('src/app/_lib/_main.ts', '**/_*.ts')).toBe(true)
  })

  it('matches with brace expansion {}', () => {
    expect(matchesGlob('src/app/index.ts', 'src/{app,lib}/index.ts')).toBe(true);
    expect(matchesGlob('src/lib/index.ts', 'src/{app,lib}/index.ts')).toBe(true);
  });

  it('matches with mixed wildcards and brace expansion', () => {
    expect(matchesGlob('src/app/index.ts', 'src/{app,lib}/*.ts')).toBe(true);
    expect(matchesGlob('src/lib/index.ts', 'src/{app,lib}/*.ts')).toBe(true);
    expect(matchesGlob('src/test/index.ts', 'src/{app,lib}/*.ts')).toBe(false);
  });

  it('matches with leading and trailing slashes', () => {
    expect(matchesGlob('/src/app/index.ts', '/src/app/*.ts')).toBe(true);
    expect(matchesGlob('src/app/index.ts/', 'src/app/*.ts')).toBe(true);
    expect(matchesGlob('/src/app/index.ts/', '/src/app/*.ts')).toBe(true);
  });

})
