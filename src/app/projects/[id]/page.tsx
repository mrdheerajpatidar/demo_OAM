import React from "react";
import { notFound } from "next/navigation";
import { projects, builders } from "@/data/mockData";
import ProjectDetailsClient from "@/components/ProjectDetailsClient";

export async function generateStaticParams() {
  return projects.map((p) => ({
    id: p.id,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const builder = builders.find((b) => b.id === project.builderId);
  const relatedProjects = projects
    .filter((p) => p.location === project.location && p.id !== project.id)
    .slice(0, 3);

  return (
    <ProjectDetailsClient
      project={project}
      builder={builder}
      relatedProjects={relatedProjects}
    />
  );
}
