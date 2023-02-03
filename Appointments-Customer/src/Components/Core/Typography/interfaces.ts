export interface TitleProps {
  heading?: string;
  variant?: "h1 display 1" | "h2 display 2" | "h3 display 3" | "h4 display 4";
}
export interface HeadingProps {
  heading?: string | null ;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: string | undefined;
  style?: any;
}

export interface ParagraphProps {
  heading?: string | null;
  variant?:
    | "text-success"
    | "text-warning"
    | "text-danger"
    | "text-info"
    | "text-primary"
    | "text-muted"
    | "lead";
  style?: any;
  additionalClass?: string | undefined;
}
