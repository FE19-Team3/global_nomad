const Footer = () => {
  const members = ['박유진', '방다연', '노혁', '김정대'];

  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-6 md:py-8">
      <div className="mx-auto max-w-screen-xl px-4 md:px-6">
        <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between">
          <div className="text-b-14 text-gray-900 md:text-b-16">코드잇 스프린트 FE 19기 3팀</div>

          <div className="flex flex-wrap justify-center gap-2 text-m-12 text-gray-600 md:justify-start md:text-m-14">
            {members.map((member, index) => (
              <span key={member} className="flex items-center gap-2">
                {member}
                {index < members.length - 1 && <span className="text-gray-300">|</span>}
              </span>
            ))}
          </div>

          <a
            href="https://github.com/FE19-Team3/global_nomad"
            target="_blank"
            rel="noopener noreferrer"
            className="text-m-12 text-gray-600 transition-colors hover:text-gray-900 md:text-m-14"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
