import SNS from "./FooterItem/SNS";
import Copywrite from "./FooterItem/Copywrite";

export default function SimpleFooter() {
  return (
    <footer className="border-t border-t-light_gray_3/30 dark:border-t-night_gray_3/30">
      {/* sub footer */}
      <div className="container flex-wrap gap-2 px-5 py-4 mx-auto col-center sm:flex-row">
        <Copywrite />
        <SNS />
      </div>
    </footer>
  );
}
