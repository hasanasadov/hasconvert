const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL as string;

const GitHubLogin = ({ className }: { className?: string }) => {
  const handleClick = () => {
    window.location.href = `${BASE_URL}/auth/github`;
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`w-full flex items-center justify-center bg-white hover:bg-orange-100  ${className}`}
    >
      <span className="ml-2">Sign in with GitHub</span>
    </button>
  );
};

export default GitHubLogin;
