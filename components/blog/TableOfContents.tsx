"use client";

import React, { useState, useEffect } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
}

export default function TableOfContents({ className = '' }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from the page
    const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const headingList: Heading[] = [];

    headingElements.forEach((heading, index) => {
      const id = heading.id || `heading-${index}`;
      if (!heading.id) {
        heading.id = id;
      }
      
      headingList.push({
        id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName.charAt(1))
      });
    });

    setHeadings(headingList);

    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0
      }
    );

    headingElements.forEach((heading) => {
      observer.observe(heading);
    });

    return () => {
      headingElements.forEach((heading) => {
        observer.unobserve(heading);
      });
    };
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className={`bg-slate-50 dark:bg-slate-800 rounded-xl p-6 ${className}`}>
      <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">
        Table of Contents
      </h3>
      <nav>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li key={heading.id}>
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={`
                  block w-full text-left text-sm transition-colors
                  ${heading.level === 1 ? 'font-medium' : ''}
                  ${heading.level === 2 ? 'pl-3' : ''}
                  ${heading.level === 3 ? 'pl-6' : ''}
                  ${heading.level >= 4 ? 'pl-9' : ''}
                  ${
                    activeId === heading.id
                      ? 'text-blue-600 dark:text-blue-400 font-medium'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }
                `}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
