import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock the storage module so no real file I/O happens
vi.mock('@/lib/storage', () => ({
  getProjects: vi.fn(),
}));

import { GET } from '@/app/api/projects/route';
import { getProjects } from '@/lib/storage';
import type { Project } from '@/lib/types';

const mockProjects: Project[] = [
  {
    id: 1,
    title: 'Project Alpha',
    subtitle: 'A great project',
    description: 'Description for project alpha',
    longDescription: 'Long description for project alpha',
    technologies: ['React', 'TypeScript'],
    features: ['Feature 1', 'Feature 2'],
    icon: 'Code',
    gradient: 'from-blue-500 to-purple-500',
    status: 'active',
    impact: 'High impact',
    category: 'web',
  },
  {
    id: 2,
    title: 'Project Beta',
    subtitle: 'Another great project',
    description: 'Description for project beta',
    longDescription: 'Long description for project beta',
    technologies: ['Next.js', 'Tailwind'],
    features: ['Feature 3', 'Feature 4'],
    icon: 'Database',
    gradient: 'from-green-500 to-blue-500',
    status: 'active',
    impact: 'Medium impact',
    category: 'web',
  },
  {
    id: 3,
    title: 'Project Gamma',
    subtitle: 'Yet another project',
    description: 'Description for project gamma',
    longDescription: 'Long description for project gamma',
    technologies: ['Node.js', 'Express'],
    features: ['Feature 5', 'Feature 6'],
    icon: 'Server',
    gradient: 'from-orange-500 to-red-500',
    status: 'completed',
    impact: 'High impact',
    category: 'backend',
  },
  {
    id: 4,
    title: 'Project Delta',
    subtitle: 'The final project',
    description: 'Description for project delta',
    longDescription: 'Long description for project delta',
    technologies: ['Python', 'FastAPI'],
    features: ['Feature 7', 'Feature 8'],
    icon: 'Brain',
    gradient: 'from-purple-500 to-pink-500',
    status: 'completed',
    impact: 'Low impact',
    category: 'ai',
  },
];

describe('GET /api/projects', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return 200 with success true and 4 projects', async () => {
    vi.mocked(getProjects).mockResolvedValue(mockProjects);

    const response = await GET();
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
    expect(Array.isArray(json.data)).toBe(true);
    expect(json.data).toHaveLength(4);
    expect(json.data).toEqual(mockProjects);
  });

  it('should return 200 with empty array when no projects exist', async () => {
    vi.mocked(getProjects).mockResolvedValue([]);

    const response = await GET();
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data).toEqual([]);
  });

  it('should return 500 when storage throws an error', async () => {
    vi.mocked(getProjects).mockRejectedValue(new Error('Storage error'));

    const response = await GET();
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json.success).toBe(false);
    expect(json.error).toBe('Internal server error');
  });
});


