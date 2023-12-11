import "./style.less";
export const ContentCard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="content-card">{children}</div>;
};
