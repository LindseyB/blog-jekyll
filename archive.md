---
layout: page
title: Archive
---

All blog posts organized by year.

{% assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}

{% for year_group in posts_by_year %}
## {{ year_group.name }}

<div class="archive-year">
  {% for post in year_group.items %}
  <article class="archive-post">
    <div class="archive-date">
      <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d" }}</time>
    </div>
    <div class="archive-content">
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      {% if post.excerpt %}
      <p class="archive-excerpt">{{ post.excerpt | strip_html | truncatewords: 20 }}</p>
      {% endif %}
    </div>
  </article>
  {% endfor %}
</div>
{% endfor %}

<style>
.archive-year {
  margin-bottom: 3rem;
}

.archive-post {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 2rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--color-border);
}

.archive-post:last-child {
  border-bottom: none;
}

.archive-date {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--color-text-muted);
  text-align: right;
  padding-top: 0.5rem;
}

.archive-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
  line-height: 1.3;
}

.archive-content h3 a {
  color: var(--color-text-primary);
  text-decoration: none;
}

.archive-content h3 a:hover {
  color: var(--color-accent-primary);
}

.archive-excerpt {
  color: var(--color-text-secondary);
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .archive-post {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .archive-date {
    text-align: left;
    padding-top: 0;
  }
}
</style>