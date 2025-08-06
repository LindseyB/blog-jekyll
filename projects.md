---
layout: page
title: Projects
---

A collection of my personal projects and creative work.

<div class="projects-container">
    <div class="projects-grid">
        {% for project in site.data.projects %}
            <div class="project-card">
                <a href="{{ project.link }}" title="{{ project.name }}" class="project-link">
                    <div class="project-image-container">
                        <img src="{{ project.image }}" alt="{{ project.name }}" class="project-image" loading="lazy">
                        <div class="project-overlay">
                            <div class="project-overlay-content">
                                <span class="view-project">View Project</span>
                                <svg class="external-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="m7 17 10-10"></path>
                                    <path d="M17 7v10"></path>
                                    <path d="M7 7h10"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">{{ project.name }}</h3>
                    </div>
                </a>
            </div>
        {% endfor %}
    </div>
</div>

<style>
.projects-container {
    max-width: var(--container-max-width);
    margin: 2rem auto 0;
    padding: 0;
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    margin: 0;
}

.project-card {
    background: var(--color-bg-secondary);
    border-radius: var(--border-radius-lg);
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 2px solid transparent;
    box-shadow: var(--shadow-sm);
}

.project-card:hover {
    transform: translateY(-8px);
    border-color: var(--color-accent-primary);
    box-shadow: var(--shadow-lg);
}

.project-link {
    text-decoration: none;
    color: inherit;
    display: block;
}

.project-link:hover {
    text-decoration: none;
    color: inherit;
}

.project-image-container {
    position: relative;
    aspect-ratio: 16/10;
    overflow: hidden;
    background: var(--color-bg-tertiary);
}

.project-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.project-card:hover .project-image {
    transform: scale(1.05);
}

.project-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--luna-gradient);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
    opacity: 0.95;
}

.project-overlay-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-text-inverse);
    font-weight: 600;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-family: var(--font-mono);
}

.external-link-icon {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
}

.project-overlay:hover .external-link-icon {
    transform: rotate(-45deg);
}

.project-content {
    padding: 1.5rem;
    background: var(--color-bg-secondary);
}

.project-title {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--color-text-primary);
    font-family: var(--font-display);
    line-height: 1.3;

    /* Multi-line text ellipsis */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .projects-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
}

@media (max-width: 480px) {
    .project-content {
        padding: 1rem;
    }

    .project-title {
        font-size: 1.1rem;
    }

    .project-overlay-content {
        font-size: 1rem;
    }
}
</style>
