import { MetadataRoute } from "next";
import { getCourseAllSlug, getCourseBundleAllSlug } from "./courses/helper";
import { getEducatorAllSlug } from "./educator/helper";
import { getResourceSlug } from "./resources/helper";

export async function getAllSitemapEntries() {
    try {
        const [courseSlugs, courseBundle, educatorSlugs, resourceSlugs] = await Promise.all([
          getCourseAllSlug(), // Retrieve course slugs
          getCourseBundleAllSlug(), // Retrieve course bundles
          getEducatorAllSlug(), // Retrieve educator slugs
          getResourceSlug() // Retrieve resource slugs
        ]);
    
        const courseEntries = courseSlugs.map((slug: string) => ({
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/courses/${slug}`,
          lastModified: new Date(),
          priority: 0.8,
        }));

        const courseBundlesEntries = courseBundle.map((slug: string) => ({
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/collections/${slug}`,
          lastModified: new Date(),
          priority: 0.8,
        }));
    
        const educatorEntries = educatorSlugs.map((slug: string) => ({
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/educators/${slug}`,
          lastModified: new Date(),
          priority: 0.8,
        }));
        
        const resourceEntries = resourceSlugs.map((slug: string) => ({
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/resources/${slug}`,
          lastModified: new Date(),
          priority: 0.8,
        }));

        const dynamicEntries = [...courseEntries, ...courseBundlesEntries, ...educatorEntries, ...resourceEntries];
    
        return dynamicEntries;
      } catch (error) {
        console.error("Error generating sitemap entries:", error);
        return []; // Return an empty array or handle error as needed
      }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const staticEntries = [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
        lastModified: new Date(),
        priority: 0.8,
      },

      //Subscription
      // {
      //   url: `${process.env.NEXT_PUBLIC_SITE_URL}/billing/`,
      //   lastModified: new Date(),
      //   priority: 0.8,
      // },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/bulk-subscription`,
        lastModified: new Date(),
        priority: 0.8,
      },
      // {
      //   url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
      //   lastModified: new Date(),
      //   priority: 0.8,
      // },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/free`,
        lastModified: new Date(),
        priority: 0.8,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/subscribe`,
        lastModified: new Date(),
        priority: 0.8,
      },
      // {
      //   url: `${process.env.NEXT_PUBLIC_SITE_URL}/update-subscription`,
      //   lastModified: new Date(),
      //   priority: 0.8,
      // },

      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
        lastModified: new Date(),
        priority: 0.8,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/all-educators`,
        lastModified: new Date(),
        priority: 0.8,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/BTCClassPass`,
        lastModified: new Date(),
        priority: 0.8,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/business`,
        lastModified: new Date(),
        priority: 0.8,
      },
      // {
      //   url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
      //   lastModified: new Date(),
      //   priority: 0.8,
      // },
      // {
      //   url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
      //   lastModified: new Date(),
      //   priority: 0.8,
      // },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/celeb-stylists`,
        lastModified: new Date(),
        priority: 0.8,
      },
      // {
      //   url: `${process.env.NEXT_PUBLIC_SITE_URL}/certificate`,
      //   lastModified: new Date(),
      //   priority: 0.8,
      // },
      // {
      //   url: `${process.env.NEXT_PUBLIC_SITE_URL}/complete`,
      //   lastModified: new Date(),
      //   priority: 0.8,
      // },
      // {
      //   url: `${process.env.NEXT_PUBLIC_SITE_URL}/completed`,
      //   lastModified: new Date(),
      //   priority: 0.8,
      // },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/downloadables`,
        lastModified: new Date(),
        priority: 0.8,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/favorites`,
        lastModified: new Date(),
        priority: 0.8,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/haircolor`,
        lastModified: new Date(),
        priority: 0.8,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/haircutting`,
        lastModified: new Date(),
        priority: 0.8,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/hairextensions`,
        lastModified: new Date(),
        priority: 0.8,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/masterclasses`,
        lastModified: new Date(),
        priority: 0.8,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/mens`,
        lastModified: new Date(),
        priority: 0.8,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/pause`,
        lastModified: new Date(),
        priority: 0.8,
      },
      // {
      //   url: `${process.env.NEXT_PUBLIC_SITE_URL}/profile`,
      //   lastModified: new Date(),
      //   priority: 0.8,
      // },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/social-climbing`,
        lastModified: new Date(),
        priority: 0.8,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/social-media`,
        lastModified: new Date(),
        priority: 0.8,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/styling`,
        lastModified: new Date(),
        priority: 0.8,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/support`,
        lastModified: new Date(),
        priority: 0.8,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/texture`,
        lastModified: new Date(),
        priority: 0.8,
      },
      // {
      //   url: `${process.env.NEXT_PUBLIC_SITE_URL}/tipreel`,
      //   lastModified: new Date(),
      //   priority: 0.8,
      // },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/tips`,
        lastModified: new Date(),
        priority: 0.8,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/webinars`,
        lastModified: new Date(),
        priority: 0.8,
      },
    ];

    const dynamicEntries = await getAllSitemapEntries(); // Retrieve dynamic sitemap entries
    const allEntries = [...staticEntries, ...dynamicEntries];

    return allEntries;
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [];
  }
}
