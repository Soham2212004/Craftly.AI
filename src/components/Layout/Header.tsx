
import { Button } from "@/components/ui/button";
import { Sparkles, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="bg-background border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Sparkles className="h-6 w-6 text-primary mr-2" />
          <h1 className="text-xl font-bold">Content Creator Toolbox</h1>
        </div>
        
        <nav className="flex items-center">
          <ul className="flex space-x-4 mr-4">
            <li>
              <Button variant="ghost" size="sm">
                Home
              </Button>
            </li>
            <li>
              <Button variant="ghost" size="sm">
                History
              </Button>
            </li>
          </ul>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
