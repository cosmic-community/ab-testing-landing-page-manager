// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// A/B Test interface
export interface ABTest extends CosmicObject {
  type: 'ab-tests';
  metadata: {
    test_name: string;
    description?: string;
    test_status: {
      key: TestStatus;
      value: string;
    };
    traffic_split?: number;
    conversion_goal?: string;
  };
}

// Landing Page interface
export interface LandingPage extends CosmicObject {
  type: 'landing-pages';
  metadata: {
    page_name: string;
    ab_test: ABTest;
    variant_type: {
      key: VariantType;
      value: string;
    };
    hero_headline: string;
    hero_subheadline?: string;
    hero_image?: {
      url: string;
      imgix_url: string;
    };
    cta_button_text: string;
    cta_button_url?: string;
    features_benefits?: string;
    social_proof?: string;
    page_title?: string;
    meta_description?: string;
    page_status: {
      key: PageStatus;
      value: string;
    };
  };
}

// Type literals for select-dropdown values
export type TestStatus = 'draft' | 'running' | 'paused' | 'completed';
export type VariantType = 'control' | 'variant';
export type PageStatus = 'draft' | 'live' | 'archived';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}

// Type guards for runtime validation
export function isABTest(obj: CosmicObject): obj is ABTest {
  return obj.type === 'ab-tests';
}

export function isLandingPage(obj: CosmicObject): obj is LandingPage {
  return obj.type === 'landing-pages';
}

// Utility types
export type CreateLandingPageData = Omit<LandingPage, 'id' | 'created_at' | 'modified_at'>;
export type CreateABTestData = Omit<ABTest, 'id' | 'created_at' | 'modified_at'>;