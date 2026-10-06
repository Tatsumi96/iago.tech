import { useTranslations } from 'next-intl';
import { RevealOnScroll } from '../animations/RevealOnScroll';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { CONTACT_EMAIL, CONTACT_PHONE, COMPANY_ADDRESS } from '@/lib/constants';

export default function ContactSection() {
  const t = useTranslations('Contact');

  return (
    <section id="contact" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute -left-40 -top-40 w-[400px] h-[400px] bg-white opacity-[0.08] rounded-full blur-3xl pointer-events-none" />
      
      <div className="container px-4 md:px-8 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <RevealOnScroll>
              <h2 className="text-3xl md:text-[44px] font-heading font-extrabold mb-6 leading-tight text-white">
                {t('title')}
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <p className="text-xl text-primary-foreground/90 mb-12">
                {t('subtitle')}
              </p>
            </RevealOnScroll>
            
            <div className="space-y-6">
              <RevealOnScroll delay={0.2} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/70 uppercase tracking-wider font-semibold">Téléphone</p>
                  <a href={`tel:${CONTACT_PHONE}`} className="text-lg font-medium text-white hover:underline">{CONTACT_PHONE}</a>
                </div>
              </RevealOnScroll>
              
              <RevealOnScroll delay={0.3} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/70 uppercase tracking-wider font-semibold">Email</p>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-lg font-medium text-white hover:underline">{CONTACT_EMAIL}</a>
                </div>
              </RevealOnScroll>
              
              <RevealOnScroll delay={0.4} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/70 uppercase tracking-wider font-semibold">Adresse</p>
                  <p className="text-lg font-medium text-white">{COMPANY_ADDRESS}</p>
                </div>
              </RevealOnScroll>
            </div>
          </div>
          
          <RevealOnScroll delay={0.2} direction="left">
            <div className="bg-background text-foreground p-8 rounded-[10px] shadow-lg border border-border/50">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Nom</label>
                    <input type="text" id="name" className="w-full flex h-11 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" placeholder="Votre nom" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <input type="email" id="email" className="w-full flex h-11 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" placeholder="votre@email.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <textarea id="message" rows={4} className="w-full flex rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" placeholder="Comment pouvons-nous vous aider ?" />
                </div>
                <Button size="lg" className="w-full rounded-md font-medium group">
                  Envoyer le message
                  <Send className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Button>
              </form>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
