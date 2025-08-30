import { PenTool, Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-muted/30 mt-20">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg gradient-primary">
                <PenTool className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold font-heading">Devnovate</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              A modern platform for developers and tech enthusiasts to share knowledge, 
              insights, and innovations. Join our community of writers and readers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-fast">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-fast">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-fast">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-fast">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold font-heading mb-4">Platform</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-fast">
                  Write Article
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-fast">
                  Browse Articles
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-fast">
                  Trending Topics
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-fast">
                  Author Profiles
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold font-heading mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-fast">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-fast">
                  Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-fast">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-fast">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 Devnovate. All rights reserved. Made with ❤️ for the developer community.
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            <a href="/admin" className="hover:text-primary transition-fast">Admin Portal</a> • 
            <a href="/login" className="hover:text-primary transition-fast ml-1">Login</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;