{ pkgs ? import <nixpkgs> {} }:

with pkgs;
mkShell {
  buildInputs = [
    nodejs_22
    corepack_22
    git
  ];

  shellHook = ''
    echo "SpendLess APP development environment"
    echo "Node.js $(node --version)"
    
    export BASE_URL="http://localhost:3000"
    export PORT="8080"
    export NODE_ENV="development"
  '';
}