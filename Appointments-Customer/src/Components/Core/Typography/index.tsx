import { TitleProps, HeadingProps, ParagraphProps } from "./interfaces";

const Title = ({ heading, variant }: TitleProps) => {
  return <p className={variant}>{heading}</p>;
};

const Heading = ({ heading, variant = "h2", size, style }: HeadingProps) => {
  return (
    <p className={`${size} ${variant}`} style={style}>
      {heading}
    </p>
  );
};

const Paragraph = ({ heading, variant, additionalClass, style }: ParagraphProps) => {
  return <p className={`${additionalClass} ${variant}`} style={style}>{heading}</p>;
};

export { Title, Heading, Paragraph };
