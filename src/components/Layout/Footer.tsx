
import { Instagram, Youtube, Twitter, Linkedin, Facebook, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted mt-auto py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Content Creator Toolbox. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Youtube size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
