import {
  LineShareButton,
  LineIcon,
  TwitterShareButton,
  TwitterIcon,
  HatenaIcon,
  HatenaShareButton,
  FacebookShareButton,
  FacebookIcon,
} from "next-share";

const url = `https://tenpamk2-blog.netlify.app/apps/react-diagram-maker/`; // WARNING: Sync this setting with other files.

const Footer = () => {
  return (
    <footer className="flex flex-col items-center gap-2 text-sm italic text-gray-400">
      <div className="flex gap-2">
        <LineShareButton url={url} title="ダイヤグラム生成くん">
          <LineIcon round={true} />
        </LineShareButton>
        <TwitterShareButton url={url} title="ダイヤグラム生成くん">
          <TwitterIcon round={true} />
        </TwitterShareButton>
        <HatenaShareButton url={url} title="ダイヤグラム生成くん">
          <HatenaIcon round={true} />
        </HatenaShareButton>
        <FacebookShareButton url={url} quote="ダイヤグラム生成くん">
          <FacebookIcon round={true} />
        </FacebookShareButton>
      </div>
      <p>
        <a href="https://twitter.com/tenpaMk2/" className="underline">
          Author: tenpaMk2
        </a>
      </p>
      <p>
        <a
          href="https://github.com/tenpaMk2/react-diagram-maker/"
          className="underline"
        >
          Source code: github
        </a>
      </p>
    </footer>
  );
};

export default Footer;
