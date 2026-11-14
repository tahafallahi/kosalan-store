import ContentPadding from "../content-padding/content-padding";

export default function Footer() {
  return (
    <footer className="border-t bg-card pt-5 pb-27 ">
      <ContentPadding>
        <div className="flex w-full justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-xl font-bold ">فروشگاه لبنیات کوسالان</p>
            <div className="flex flex-col gap-1">

            <p>درباره ما</p>
            <p>تماس با ما</p>
            <p>بلاگ</p>
            </div>
          </div>
        </div>
      </ContentPadding>
    </footer>
  );
}
