export interface ClientReviewItemTypes {
  id: string;
  text: string;
  rating: number;
  user: {
    name: string;
    photo: string;
  };
}

export interface QuestionItemTypes {
  id: number;
  question: string;
  answer: any;
}

export interface MotoItemTypes {
  id: number;
  motoText: string;
}

export interface TeamMemberTypes {
  id: string;
  name: string;
  position: string;
  image: string;
}

// SOCIAL SHAIR MODAL TYPES
export interface SocialShareTypes {
  text: string;
  url: string;
  closeModal: () => void;
}
