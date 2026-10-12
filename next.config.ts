import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // One-line installer for nixcraft (github.com/axosis00x/nixcraft):
      //   curl -fsSL https://subashlamatamang.com.np/install | bash
      // Points at the script on GitHub so the site never needs updating
      // when it changes. Temporary (307) so the target can move later.
      {
        source: "/install",
        destination:
          "https://raw.githubusercontent.com/axosis00x/nixcraft/main/scripts/bootstrap.sh",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
