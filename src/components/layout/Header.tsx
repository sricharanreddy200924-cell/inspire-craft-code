import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, PenTool, User, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto max-w-7xl">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg gradient-primary">
            <PenTool className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold font-heading">Devnovate</span>
        </Link>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search articles..."
              className="pl-10 bg-muted/50 border-border/50 focus:bg-background transition-all"
            />
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground hover:text-primary transition-fast font-medium">
            Articles
          </Link>
          <a href="#trending" className="text-foreground hover:text-primary transition-fast font-medium">
            Trending
          </a>
          <a href="#categories" className="text-foreground hover:text-primary transition-fast font-medium">
            Categories
          </a>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </Link>
          <Button variant="hero" size="sm">
            Write Article
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
          <div className="container px-4 py-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search articles..."
                className="pl-10 bg-muted/50 border-border/50"
              />
            </div>
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-foreground hover:text-primary transition-fast font-medium py-2">
                Articles
              </Link>
              <a href="#trending" className="text-foreground hover:text-primary transition-fast font-medium py-2">
                Trending
              </a>
              <a href="#categories" className="text-foreground hover:text-primary transition-fast font-medium py-2">
                Categories
              </a>
            </nav>
            <div className="flex flex-col space-y-2">
              <Link to="/login">
                <Button variant="ghost" className="justify-start w-full">
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </Link>
              <Button variant="hero">
                Write Article
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;