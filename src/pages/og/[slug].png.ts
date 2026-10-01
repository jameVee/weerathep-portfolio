import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { projectOgImage } from '../../lib/og';

/** Social preview for each project page: /og/<slug>.png (1200×630). */
export const getStaticPaths = (async () => {
  const projects = await getCollection('projects');
  return projects.map((project) => ({ params: { slug: project.id }, props: { project } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { project } = props as { project: CollectionEntry<'projects'> };
  const png = await projectOgImage(project.data);
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
