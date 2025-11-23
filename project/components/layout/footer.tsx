import Link from 'next/link'
import { MapIcon, PlaneIcon, MailIcon, GithubIcon, TwitterIcon, InstagramIcon } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-card text-card-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-playfair text-2xl font-bold mb-4">
              Wanderlust<span className="text-blue-500">AI</span>
            </h3>
            <p className="text-muted-foreground mb-4">
              Discover your perfect travel destination with the help of advanced AI recommendations tailored to your preferences.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <TwitterIcon size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <InstagramIcon size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <GithubIcon size={20} />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
              <Link href="#destinations" className="text-muted-foreground hover:text-primary transition-colors">Destinations</Link>
              <Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
              <Link href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">How It Works</Link>
              <Link href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            </nav>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Top Destinations</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Bali, Indonesia</Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Kyoto, Japan</Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Santorini, Greece</Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Machu Picchu, Peru</Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Amalfi Coast, Italy</Link>
            </nav>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Contact Us</h4>
            <address className="not-italic">
              <div className="flex items-start space-x-3 mb-2">
                <MapIcon size={20} className="text-muted-foreground mt-1 flex-shrink-0" />
                <span className="text-muted-foreground">
                  123 Travel Avenue<br />
                  Wanderlust City, WL 12345
                </span>
              </div>
              <div className="flex items-center space-x-3 mb-2">
                <MailIcon size={20} className="text-muted-foreground flex-shrink-0" />
                <a href="mailto:hello@wanderlustai.com" className="text-muted-foreground hover:text-primary transition-colors">
                  hello@wanderlustai.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <PlaneIcon size={20} className="text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">Available 24/7 for travel recommendations</span>
              </div>
            </address>
          </div>
        </div>
        
        <Separator className="mb-8" />
        
        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} WanderlustAI. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer