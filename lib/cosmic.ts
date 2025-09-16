import { createBucketClient } from '@cosmicjs/sdk'
import type { ABTest, LandingPage, CosmicResponse } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all A/B tests
export async function getABTests(): Promise<ABTest[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'ab-tests' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as ABTest[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch A/B tests');
  }
}

// Fetch a single A/B test by slug
export async function getABTest(slug: string): Promise<ABTest | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'ab-tests', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object as ABTest;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch A/B test');
  }
}

// Fetch all landing pages
export async function getLandingPages(): Promise<LandingPage[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'landing-pages' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as LandingPage[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch landing pages');
  }
}

// Fetch landing pages for a specific A/B test
export async function getLandingPagesByTest(testId: string): Promise<LandingPage[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'landing-pages',
        'metadata.ab_test': testId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as LandingPage[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch landing pages for test');
  }
}

// Fetch a single landing page by slug
export async function getLandingPage(slug: string): Promise<LandingPage | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'landing-pages', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object as LandingPage;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch landing page');
  }
}