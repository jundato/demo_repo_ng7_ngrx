export interface Reviewer {
  id: string;
  descriptionId: string;
  title: string;
  description: string;
  hasLoaded: boolean;
}

export interface ListState {
  isBusy: boolean;
  reviewers: Reviewer[];
}

export const initialState: ListState = {
  isBusy: true,
  reviewers: []
};
