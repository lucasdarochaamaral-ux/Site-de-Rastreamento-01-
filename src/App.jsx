import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Monitor, 
  Smartphone, 
  Mail, 
  MessageCircle, 
  Palette, 
  Headphones,
  CheckCircle,
  Star,
  ArrowRight,
  Menu,
  X,
  Globe,
  Shield,
  Zap,
  Users,
  Moon,
  Sun
} from 'lucide-react'
import './App.css'

import heroMainImage from './assets/images/hero/hero-main.jpg'
import heroSecondaryImage from './assets/images/hero/hero-secondary.jpg'
import responsiveDevicesImage from './assets/images/mockups/responsive-devices.jpg'
import websiteShowcaseImage from './assets/images/mockups/website-showcase.jpg'
import happyClientsImage from './assets/images/testimonials/happy-clients.jpg'
import businessPeopleImage from './assets/images/testimonials/business-people.jpg'
import Portifolio1 from './assets/images/mockups/Portifolio1.jpg'
import Portifolio2 from './assets/images/mockups/Portifolio2.jpg'
import Portifolio3 from './assets/images/mockups/Portifolio3.jpg'
import Portifolio4 from './assets/images/mockups/Portifolio4.jpg'

// Componente ChatBot ConnectCar - Versão WhatsApp Premium com Imagens e Animações
const ChatBot = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isShimmering, setIsShimmering] = useState(false);
  const [hoveredX, setHoveredX] = useState(null);
  const [headerStatus, setHeaderStatus] = useState('online'); // 'online' ou 'typing'
  const [showFloatingButton, setShowFloatingButton] = useState(true);

  // Função para obter saudação baseada na hora
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  // Animação de brilho ao abrir o site
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShimmering(true);
      setTimeout(() => setIsShimmering(false), 2000);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Abre automaticamente após 6 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasAutoOpened) {
        handleOpenChat();
      }
    }, 6000);

    return () => clearTimeout(timer);
  }, [hasAutoOpened]);

  // Detecta quando o usuário tenta sair do site
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!hasAutoOpened) {
        e.preventDefault();
        e.returnValue = '';
        handleOpenChat();
      }
    };

    const handleMouseLeave = (e) => {
      if (e.clientY < 50 && !hasAutoOpened && !isOpen) {
        handleOpenChat();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasAutoOpened, isOpen]);

  // Animação de brilho a cada 10 segundos
  useEffect(() => {
    if (isOpen || !showFloatingButton) return;

    const shimmerInterval = setInterval(() => {
      setIsShimmering(true);
      setTimeout(() => setIsShimmering(false), 2000);
    }, 10000);

    return () => clearInterval(shimmerInterval);
  }, [isOpen, showFloatingButton]);

  // Fechar chat ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      const chatContainer = document.querySelector('.chat-container');
      const floatingButton = document.querySelector('.floating-button');
      
      if (isOpen && 
          chatContainer && 
          !chatContainer.contains(event.target) && 
          (!floatingButton || !floatingButton.contains(event.target))) {
        handleCloseChat();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleOpenChat = () => {
    setIsClosing(false);
    setIsAnimating(true);
    setIsOpen(true);
    setHasAutoOpened(true);
    setShowFloatingButton(false);
    
    setTimeout(() => {
      setIsAnimating(false);
      if (!hasStarted) {
        startConversation();
        setHasStarted(true);
      }
    }, 300);
  };

  const handleCloseChat = () => {
    setIsClosing(true);
    setIsAnimating(true);
    
    setTimeout(() => {
      setIsOpen(false);
      setIsAnimating(false);
      setIsClosing(false);
      setShowFloatingButton(true);
    }, 200);
  };

  const toggleChat = () => {
    if (isOpen) {
      handleCloseChat();
    } else {
      handleOpenChat();
    }
  };

  const startConversation = async () => {
    setIsTyping(true);
    setHeaderStatus('typing');
    
    // Primeira mensagem com animação de digitação
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsTyping(false);
    
    setMessages([{
      id: 1,
      text: `${getGreeting()}! Acompanhe seu veículo ou frota em tempo real através do seu celular.`,
      sender: 'bot',
      timestamp: new Date()
    }]);

    // Segunda mensagem com animação de digitação
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1800));
    setIsTyping(false);

    setMessages(prev => [...prev, {
      id: 2,
      text: 'Receba um orçamento sem compromisso, contrate sem carência.',
      sender: 'bot',
      timestamp: new Date()
    }]);

    // Volta para o status online após as mensagens
    setTimeout(() => {
      setHeaderStatus('online');
    }, 500);

    // Mostra opções após as mensagens
    setTimeout(() => {
      setShowOptions(true);
    }, 500);
  };

  const handleOptionClick = (option) => {
    let message = '';
    
    switch (option) {
      case 'orcamento':
        message = 'Olá! Gostaria de receber um orçamento para rastreamento do meu veículo.';
        break;
      case 'preco':
        message = 'Olá! Gostaria de saber mais sobre os preços do rastreamento.';
        break;
      case 'funcionamento':
        message = 'Olá! Como funciona o sistema de rastreamento?';
        break;
      default:
        message = 'Olá! Gostaria de informações sobre rastreamento veicular.';
    }

    // Adiciona mensagem do usuário
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text: option === 'orcamento' ? 'Quero receber um orçamento' : 
            option === 'preco' ? 'Quanto custa o rastreamento?' :
            'Como funciona o sistema?',
      sender: 'user',
      timestamp: new Date()
    }]);

    // Redireciona para WhatsApp
    setTimeout(() => {
      window.open(`https://api.whatsapp.com/send?phone=5511932691882&text=${encodeURIComponent(message)}`, '_blank');
    }, 800);
  };

  // Funções para gerenciar o hover dos botões X
  const handleXMouseEnter = (xType) => {
    setHoveredX(xType);
  };

  const handleXMouseLeave = () => {
    setHoveredX(null);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 chat-container">
      {/* Janela do Chat - Estilo WhatsApp Premium */}
      {isOpen && (
        <div className={`
          w-80 h-96 flex flex-col shadow-2xl border
          transform transition-all duration-300 ease-out
          rounded-lg
          ${isAnimating ? 'scale-95 opacity-90' : 'scale-100 opacity-100'}
          ${isDarkMode 
            ? 'bg-[#1f2c34] border-[#2a3942] text-white' 
            : 'bg-white border-gray-300 text-gray-800'
          }
        `}>
          {/* Cabeçalho - Estilo WhatsApp com Imagens Personalizadas */}
          <div className={`
            p-3 border-b flex items-center justify-between rounded-t-lg
            ${isDarkMode 
              ? 'bg-[#202c33] border-[#2a3942] text-white' 
              : 'bg-[#008069] text-white'
            }
          `}>
            <div className="flex items-center space-x-3">
              {/* Avatar com imagem personalizada */}
              <div className="relative">
                <img 
                  src="https://i.ibb.co/R43gV7Hg/ABA-NAVEGADOR-IMAGEM-FAVICON-5.jpg" 
                  alt="ConnectCar"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white"
                />
                {/* Indicador online */}
                <div className={`
                  absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2
                  ${isDarkMode ? 'bg-green-500 border-[#202c33]' : 'bg-green-400 border-[#008069]'}
                `}></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-sm">ConnectCar</h3>
                  {/* Selo de Verificação Personalizado */}
                  <img 
                    src="https://i.ibb.co/QFzkzn2p/ABA-NAVEGADOR-IMAGEM-FAVICON-3.jpg" 
                    alt="Verificado"
                    className="w-4 h-4 object-contain rounded-sm"
                  />
                </div>
                <div className="text-xs opacity-90 transition-all duration-300">
                  {headerStatus === 'typing' ? (
                    <div className="flex items-baseline space-x-1">
                      <span>Digitando</span>
                      <div className="flex space-x-1 items-end">
                        <div className={`
                          w-1 h-1 rounded-full animate-whatsapp-typing
                          ${isDarkMode ? 'bg-white' : 'bg-white'}
                        `} style={{animationDelay: '0.1s'}}></div>
                        <div className={`
                          w-1 h-1 rounded-full animate-whatsapp-typing
                          ${isDarkMode ? 'bg-white' : 'bg-white'}
                        `} style={{animationDelay: '0.2s'}}></div>
                        <div className={`
                          w-1 h-1 rounded-full animate-whatsapp-typing
                          ${isDarkMode ? 'bg-white' : 'bg-white'}
                        `} style={{animationDelay: '0.3s'}}></div>
                      </div>
                    </div>
                  ) : (
                    <span className="animate-fade-in">Online • responde em segundos</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={handleCloseChat}
                onMouseEnter={() => handleXMouseEnter('header')}
                onMouseLeave={handleXMouseLeave}
                className={`
                  opacity-70 hover:opacity-100 transition-all duration-300 
                  p-1 rounded-full hover:bg-black hover:bg-opacity-30 text-white
                  ${hoveredX === 'header' ? 'animate-single-spin' : ''}
                `}
              >
                <X className="w-4 h-4 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Área de Mensagens */}
          <div className={`
            flex-1 p-4 overflow-y-auto
            ${isDarkMode ? 'bg-[#0b141a]' : 'bg-[#e5ddd5]'}
          `} style={{
            backgroundImage: isDarkMode 
              ? 'url("data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23202c33%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
              : 'url("data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23000000%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }}>
            <div className="space-y-2">
              {/* Mensagens do bot */}
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`
                    max-w-xs px-3 py-2 rounded-lg shadow-sm transition-all duration-200
                    ${msg.sender === 'bot' 
                      ? (isDarkMode 
                          ? 'bg-[#202c33] text-white rounded-bl-none' 
                          : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                        ) 
                      : (isDarkMode 
                          ? 'bg-[#005c4b] text-white rounded-br-none' 
                          : 'bg-[#d9fdd3] text-gray-800 rounded-br-none'
                        )
                    }
                    ${isAnimating ? 'transform scale-95' : 'transform scale-100'}
                  `}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p className={`
                      text-xs opacity-70 text-right mt-1
                      ${msg.sender === 'bot' && isDarkMode ? 'text-gray-400' : ''}
                    `}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Animação de digitação */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className={`
                    px-4 py-3 rounded-lg shadow-sm
                    ${isDarkMode 
                      ? 'bg-[#202c33] text-white rounded-bl-none' 
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                    }
                  `}>
                    <div className="flex space-x-1 items-center">
                      <div className={`
                        w-2 h-2 rounded-full animate-bounce
                        ${isDarkMode ? 'bg-gray-400' : 'bg-gray-500'}
                      `}></div>
                      <div className={`
                        w-2 h-2 rounded-full animate-bounce
                        ${isDarkMode ? 'bg-gray-400' : 'bg-gray-500'}
                      `} style={{animationDelay: '0.1s'}}></div>
                      <div className={`
                        w-2 h-2 rounded-full animate-bounce
                        ${isDarkMode ? 'bg-gray-400' : 'bg-gray-500'}
                      `} style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Opções de Resposta */}
          {showOptions && (
            <div className={`
              p-3 border-t transition-all duration-300 rounded-b-lg
              ${isAnimating ? 'opacity-70' : 'opacity-100'}
              ${isDarkMode 
                ? 'bg-[#202c33] border-[#2a3942]' 
                : 'bg-white border-gray-200'
              }
            `}>
              <div className="space-y-2">
                <button
                  onClick={() => handleOptionClick('orcamento')}
                  className={`
                    w-full text-center p-3 text-sm font-medium transition-all duration-200 
                    border-2 hover:scale-105 hover:shadow-md active:scale-95 rounded-lg
                    ${isDarkMode 
                      ? 'border-blue-600 bg-blue-700 hover:bg-blue-600 text-white' 
                      : 'border-blue-500 bg-blue-500 hover:bg-blue-400 text-white'
                    }
                  `}
                >
                  Receber orçamento sem compromisso
                </button>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: 'preco', text: 'Valores' },
                    { key: 'funcionamento', text: 'Como funciona' }
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => handleOptionClick(item.key)}
                      className={`
                        text-center p-3 text-xs transition-all duration-200 
                        border hover:scale-105 active:scale-95 rounded-lg
                        ${isDarkMode 
                          ? 'border-[#2a3942] hover:bg-[#2a3942] text-white' 
                          : 'border-gray-200 hover:bg-gray-50 text-gray-800'
                        }
                      `}
                    >
                      {item.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Botão do Chat - Ícone WhatsApp Idêntico */}
      {showFloatingButton && (
        <button
          onClick={toggleChat}
          className={`
            floating-button flex items-center justify-center w-20 h-20 rounded-full 
            shadow-2xl transition-all duration-300 ease-out
            hover:scale-110 active:scale-95 relative overflow-hidden
            ${isAnimating ? 'scale-105' : 'scale-100'}
            ${isOpen 
              ? (isDarkMode 
                  ? 'bg-gray-600 hover:bg-gray-500' 
                  : 'bg-gray-500 hover:bg-gray-400'
                )
              : (isDarkMode 
                  ? 'bg-[#00a884] hover:bg-[#00bf8e] shadow-lg' 
                  : 'bg-[#00a884] hover:bg-[#00bf8e] shadow-lg'
                )
            }
            text-white animate-fade-in
          `}
        >
          <svg 
            width="36" 
            height="36" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-300 relative z-10"
          >
            <path 
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" 
              fill="currentColor"
            />
          </svg>
          
          {/* Efeito de brilho passando da esquerda para a direita */}
          {isShimmering && (
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 z-0"></div>
          )}
        </button>
      )}

      {/* Estilos para as animações */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        
        @keyframes single-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes whatsapp-typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-3px);
            opacity: 1;
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-out;
        }
        
        .animate-single-spin {
          animation: single-spin 0.4s ease-out;
        }

        .animate-whatsapp-typing {
          animation: whatsapp-typing 1.4s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [currentCarouselImage1, setCurrentCarouselImage1] = useState(0)
  const [currentCarouselImage2, setCurrentCarouselImage2] = useState(0)
  // 🖼️ CORREÇÃO CARROSSEL: Estados para controlar imagens do carrossel

  // 💬 EMAILJS: Estados para o formulário
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Detectar seção ativa
      const sections = ['sites', 'planos', 'portfolio', 'contato', 'formulário']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      setActiveSection(current || '')
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // 🧩 CORREÇÃO NAVEGAÇÃO: Posicionar exatamente no topo da seção
      const headerHeight = 80 // Altura aproximada do header fixo
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setIsMenuOpen(false)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  // 💬 EMAILJS: Função para enviar formulário
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('')

    try {
      const templateParams = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message || 'Nenhuma mensagem adicional fornecida.'
      }

      await window.emailjs.send(
        'service_uaf8zg8',
        'template_c04hfeu',
        templateParams
      )

      setSubmitStatus('success')
      setFormData({ name: '', phone: '', email: '', message: '' })
      
      // Redirecionar para WhatsApp após envio bem-sucedido
      setTimeout(() => {
        window.open('https://api.whatsapp.com/send?phone=5511932691882&text=Ol%C3%A1,%20tudo%20bem!%20Gostaria%20de%20saber%20mais%20sobre%20o%20servi%C3%A7o%20de%20rastreamento.&utm_source=site&utm_medium=botao&utm_campaign=geral', '_blank')
      }, 1000)

    } catch (error) {
      console.error('Erro ao enviar formulário:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // 💬 EMAILJS: Função para atualizar dados do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // 🖼️ CORREÇÃO CARROSSEL: Arrays de imagens para os carrosséis
// 🖼️ CORREÇÃO CARROSSEL: Arrays de imagens para os carrosséis (agora com 3 imagens)
// 🖼️ CORREÇÃO CARROSSEL: Arrays de imagens para os carrosséis (agora com 6 imagens)
const carouselImages1 = [
  { image: responsiveDevicesImage, link: "https://www.connectcar123.com" },
  { image: Portifolio4, link: "https://www.google.com" },
  { image: Portifolio1, link: "https://www.connectcar123.com" },
  { image: Portifolio2, link: "https://www.connectcar123.com" },
  { image: Portifolio3, link: "https://www.connectcar123.com" },
]

const carouselImages2 = [
  { image: websiteShowcaseImage, link: "https://www.connectcar123.com" },
  { image: responsiveDevicesImage, link: "https://www.connectcar123.com" },
  { image: Portifolio4, link: "https://www.connectcar123.com" },
  { image: Portifolio3, link: "https://www.connectcar123.com" },
  { image: Portifolio2, link: "https://www.connectcar123.com" },
  { image: Portifolio1, link: "https://www.connectcar123.com" }
]



  // 🖼️ CORREÇÃO CARROSSEL: Rotação automática das imagens
  useEffect(() => {
    const interval1 = setInterval(() => {
      setCurrentCarouselImage1(prev => (prev + 1) % carouselImages1.length)
    }, 4000)
    
    const interval2 = setInterval(() => {
      setCurrentCarouselImage2(prev => (prev + 1) % carouselImages2.length)
    }, 4500) // Intervalo ligeiramente diferente para não sincronizar
    
    return () => {
      clearInterval(interval1)
      clearInterval(interval2)
    }
  }, [])

  const benefits = [
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Sites Responsivos",
      description: "Design que se adapta perfeitamente a todos os dispositivos"
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "E-mails Profissionais",
      description: "Contas de e-mail personalizadas com seu domínio"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Tema Escuro e Claro",
      description: "Site com botão no cabeçalho para alterar cor de fundo (Dark e Light)"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "WhatsApp Integrado",
      description: "Botão de contato direto via WhatsApp"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Provedor de alta Velocidade",
      description: "Página com carregamento rápido e estável "
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "Suporte Técnico",
      description: "Atendimento especializado quando precisar"
    }
  ]

  const plans = [
    {
      name: "Plano Essencial",
      price: "38,80",
      period: "/mês",
      description: "Perfeito para pequenas empresas que querem marcar presença online",
      features: [
        "Site responsivo profissional",
        "Personalizado",
        "Formulário de contato",
        "WhatsApp integrado",
        "Certificado SSL",
        "Suporte técnico",
        "Tema dark e light (botão no cabeçalho)"
      ],
      highlight: false
    },
    {
      name: "Plano Popular",
      price: "43,60",
      period: "/mês",
      description: "Solução completa com domínio e e-mails profissionais inclusos",
      features: [
        "Tudo do Plano Essencial",
        "Domínio grátis por 1 ano",
        "3 contas de e-mail profissionais",
        "Integração de e-mail com Gmail",
        "Personalizações Excusivas",
        "SEO otimizado",
        "Modificações Agendadas"
      ],
      highlight: true
    }
  ]

  const testimonials = [
    {
      name: "Maria Silva",
      company: "Silva Advocacia",
      rating: 5,
      comment: "O site ficou exatamente como imaginei. Profissional e moderno. Recomendo!"
    },
    {
      name: "João Santos",
      company: "Santos Consultoria",
      rating: 5,
      comment: "Excelente atendimento e entrega rápida. Meu negócio cresceu 40% após o site."
    },
    {
      name: "Ana Costa",
      company: "Acedêmia Senior",
      rating: 5,
      comment: "Site lindo e funcional. Os clientes elogiam muito o design e facilidade de uso."
    },
    {
      name: "Carlos Oliveira",
      company: "Oliveira Engenharia",
      rating: 5,
      comment: "Suporte excepcional e site que realmente converte visitantes em clientes."
    }
  ]

  const faqItems = [
    {
      question: "Quanto tempo leva para criar meu site?",
      answer: "Entregamos seu site em até 10 dias úteis, personalizado e com seu domínio e e-mails criados."
    },
    {
      question: "Posso fazer alterações no site depois de pronto?",
      answer: "Sim, você pode escolher imagens, textos, cores e muito mais. Aproveite o Plano Popular para realizar modificações agendadas."
    },
    {
      question: "O site funciona em celulares?",
      answer: "Todos os nossos sites são responsivos e funcionam perfeitamente em computadores, tablets e smartphones."
    },
    {
      question: "Vocês oferecem suporte após a entrega?",
      answer: "Sim, oferecemos suporte técnico contínuo para todos os nossos clientes."
    },
    {
      question: "Como funciona o programa de parceria de ConhectWeb?",
      answer: "Indique e ganhe! Receba R$100,00 a cada indicação que se consolidar em cliente, receba por PIX ou desconte em seu plano."
    },
    {
      question: "Como funciona o programa de parceria de ConhectWeb?",
      answer: "Indique e ganhe! Receba R$100,00 a cada indicação que se consolidar em cliente, receba por PIX ou desconte em seu plano."
    }
  ]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? `${isDarkMode ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-md shadow-lg` 
          : `${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-sm`
      }`}>
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-4">
          {/* ✅ CORREÇÃO 1.1: Padding lateral mobile mínimo 20px (px-5 = 20px) */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    className="focus:outline-none"
  >
    <img
      src="https://i.ibb.co/C5gyPxjz/CABE-ALHO-RODA-P-LOGO-9.png"
      alt="Logo ConnectWeb"
      className={`transition-all duration-300 ${isScrolled ? 'w-47 h-auto' : 'w-50 h-auto'}`}
    />
  </button>
</div>
            
            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8">
              {[
                { id: 'sites', label: 'Sites profissionais' },
                { id: 'planos', label: 'Planos' },
                { id: 'portfolio', label: 'Portfólio' },
                { id: 'contato', label: 'Contato' },
                { id: 'formulário', label: 'Formulário' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative font-medium transition-colors duration-300 group ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {/* 🔗 CORREÇÃO CABEÇALHO: Linha gradativa ao invés de mudança de cor */}
                  {item.label}
                  <div className={`absolute bottom-0 left-0 h-0.5 bg-orange-500 transition-all duration-300 ease-in-out ${
                    activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></div>
                </button>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <Button variant="outline" className={`transition-colors duration-300 ${
                isDarkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white' 
                  : 'border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white'
              }`}
              onClick={() => window.open('https://api.whatsapp.com/send?phone=5511932691882&text=Ol%C3%A1,%20tudo%20bem!%20Gostaria%20de%20saber%20mais%20sobre%20o%20servi%C3%A7o%20de%20rastreamento.&utm_source=site&utm_medium=botao&utm_campaign=geral', '_blank')}>
                Obter Cotação
              </Button>
            </div>

            {/* Mobile Menu Button + Dark Mode Toggle */}
            <div className="md:hidden flex items-center space-x-3">
              {/* 📱 CORREÇÃO 7: Botão modo escuro visível no mobile ao lado do hambúrguer */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors duration-300 min-h-[48px] min-w-[48px] flex items-center justify-center ${
                  isDarkMode 
                    ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                aria-label="Alternar modo escuro"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button 
                className={`transition-colors duration-300 min-h-[48px] min-w-[48px] flex items-center justify-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menu de navegação"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <nav className="mt-4 pb-4 border-t pt-4">
              <div className="flex flex-col space-y-4">
                {[
                  { id: 'sites', label: 'Sites profissionais' },
                  { id: 'planos', label: 'Planos' },
                  { id: 'portfolio', label: 'Portfólio' },
                  { id: 'contato', label: 'Contato' },
                  { id: 'formulário', label: 'Formulário' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left font-medium transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300 hover:text-orange-400' : 'text-gray-700 hover:text-orange-500'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="flex items-center space-x-4 pt-2">
                  <button
                    onClick={toggleDarkMode}
                    className={`p-2 rounded-lg transition-colors duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                  <Button variant="outline" className={`transition-colors duration-300 ${
                    isDarkMode 
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white' 
                      : 'border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white'
                  } w-fit`}
                  onClick={() => window.open('https://api.whatsapp.com/send?phone=5511932691882&text=Ol%C3%A1,%20tudo%20bem!%20Gostaria%20de%20saber%20mais%20sobre%20o%20servi%C3%A7o%20de%20rastreamento.&utm_source=site&utm_medium=botao&utm_campaign=geral', '_blank')}>
                    Obter Cotação
                  </Button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="sites" className="relative overflow-hidden">
        {/* 🧩 CORREÇÃO HERO: Fundo azul removido, imagem totalmente visível */}
        <img 
          src={heroMainImage}
          alt="Empresário profissional sorrindo representando sucesso nos negócios com sites profissionais"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        {/* Overlay sutil para legibilidade do texto */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        <div className="relative container mx-auto px-5 sm:px-6 lg:px-8 py-20 lg:py-32">
          {/* ✅ CORREÇÃO 1.2: Padding lateral consistente na hero section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* 🚫 CORREÇÃO 1: Botão "Seu Novo Site Começa Aqui!" removido conforme solicitado */}
              
<div className="space-y-0.5 sm:space-y-2.5 w-[110%] relative z-10">
  <div className="overflow-visible">
    <div 
      className="text-white text-5xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-none md:leading-tight tracking-tight opacity-0 transform transition-all duration-700 ease-out"
      style={{
        animation: 'slideUp 3.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards'
      }}
    >
      Localize seus veículos em tempo real por app e computador
    </div>
  </div>
</div>
              
              <p className="text-base sm:text-lg lg:text-xl text-blue-100 font-medium leading-relaxed">
                {/* ✅ CORREÇÃO 2.2: Texto corpo base 16px (text-base) com responsividade */}
                Soluções digitais sob medida para empresas que querem crescer online
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* ✅ CORREÇÃO 3.1: Botões com altura mínima 48px e transições 0.2s ease */}
                <Button size="lg" className="min-h-[48px] bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 ease-in-out hover:-translate-y-1"
                  onClick={() => window.open('https://api.whatsapp.com/send?phone=5511932691882&text=Ol%C3%A1,%20tudo%20bem!%20Gostaria%20de%20saber%20mais%20sobre%20o%20servi%C3%A7o%20de%20rastreamento.&utm_source=site&utm_medium=botao&utm_campaign=geral', '_blank')}>
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Quero meu site agora
                </Button>
                <Button size="lg" className="min-h-[48px] bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-600 hover:border-blue-700 px-8 py-4 text-lg rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 ease-in-out hover:-translate-y-1"
                  onClick={() => window.open('https://api.whatsapp.com/send?phone=5511932691882&text=Ol%C3%A1,%20tudo%20bem!%20Gostaria%20de%20saber%20mais%20sobre%20o%20servi%C3%A7o%20de%20rastreamento.&utm_source=site&utm_medium=botao&utm_campaign=geral', '_blank')}>
                  {/* 🎯 CORREÇÃO HERO: Botão com contraste adequado - fundo azul + texto branco */}
                  Solicitar orçamento gratuito
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-white/15 backdrop-blur-md border-orange/30 text-white shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                style={{ boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1), 0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                {/* 🖼️ CORREÇÃO: Sombreamento interno suave adicionado */}
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Monitor className="w-12 h-12 text-orange-400 drop-shadow-lg" />
                    <div>
                      <h3 className="text-2xl font-black text-white drop-shadow-md">Sites Completos</h3>
                      <p className="text-orange-300 font-bold text-lg drop-shadow-sm">apenas R$ 38,80/mês</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/15 backdrop-blur-md border-orange/30 text-white shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                style={{ boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1), 0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                {/* 🖼️ CORREÇÃO: Sombreamento interno suave adicionado */}
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Mail className="w-12 h-12 text-orange-400 drop-shadow-lg" />
                    <div>
                      <h3 className="text-2xl font-black text-white drop-shadow-md">E-mail Profissional</h3>
                      <p className="text-orange-300 font-bold text-lg drop-shadow-sm">incluso no plano popular</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Hero */}
      <section className="relative py-20 overflow-hidden">
        {/* 🎯 CORREÇÃO 2: Imagem de fundo completamente livre, sem overlay esbranquiçado */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroSecondaryImage})` }}
        ></div>
        {/* Overlay sutil apenas para garantir legibilidade do texto */}
        <div className="absolute inset-0 bg-black/0"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-white drop-shadow-lg">
              {/* 🎯 CORREÇÃO 2: Texto branco com sombra para contraste na imagem livre */}
              Não importa se é empresa pequena ou grande.
              <br />
              <span className="text-white-400 drop-shadow-lg"></span>
            </h2>
            <p className="text-xl text-white drop-shadow-md">
              {/* 🎯 CORREÇÃO 2: Parágrafo com texto branco e sombra para contraste */}
              Com a gente você tem acesso a um site personalizado que vai de encontro ao perfil da sua empresa.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="sites" className={`py-16 lg:py-20 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* ✅ CORREÇÃO 1.3: Espaçamento vertical padronizado (py-16 lg:py-20) */}
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          {/* ✅ CORREÇÃO 1.4: Padding lateral consistente */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-800'
            }`}>
              {/* ✅ CORREÇÃO 2.3: H2 com base 24px (text-2xl) responsivo */}
              São muitas as vantagens de possuir um site com a ConnectWeb
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* ✅ CORREÇÃO 4.1: Grid responsivo com empilhamento vertical no mobile */}
            {benefits.map((benefit, index) => (
              <Card key={index} className={`text-center transition-all duration-300 ease-in-out border-2 hover:border-orange-500 hover:shadow-xl transform hover:scale-105 hover:-translate-y-2 ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                {/* 💡 CORREÇÃO BENEFÍCIOS: Animação simétrica com elevação 3D suave */}
                <CardContent className="p-6 lg:p-8 card-content">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 floating-icon transition-colors duration-200 ${
                    isDarkMode 
                      ? 'bg-orange-500/20 text-orange-400' 
                      : 'bg-orange-100 text-orange-600'
                  }`}>
                    {benefit.icon}
                  </div>
                  <h3 className={`text-lg lg:text-xl font-bold mb-4 transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-800'
                  }`}>{benefit.title}</h3>
                  <p className={`text-sm lg:text-base leading-relaxed transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>{benefit.description}</p>
                  {/* ✅ CORREÇÃO 2.4: Texto base 16px com responsividade */}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="planos" className={`section-spacing transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-blue-50 to-orange-50'
      }`}>
        {/* ✅ CORREÇÃO 1.5: Espaçamento vertical padronizado com section-spacing */}
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          {/* ✅ CORREÇÃO 1.6: Padding lateral consistente */}
          <div className="text-center mb-12 lg:mb-16 fade-in-up">
            {/* ✅ CORREÇÃO 7.3: Animação fade-in-up */}
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 transition-colors duration-200 high-contrast-text ${
              isDarkMode ? 'text-gray-100' : 'text-gray-800'
            }`}>
              {/* ✅ CORREÇÃO 2.6: H2 hierarquia corrigida + contraste */}
              Escolha o plano ideal para sua empresa
            </h2>
            <p className={`text-base lg:text-lg max-w-3xl mx-auto leading-relaxed transition-colors duration-200 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {/* ✅ CORREÇÃO 2.7: Texto corpo base 16px + leading-relaxed */}
              Planos transparentes e acessíveis, sem surpresas. Tudo que você precisa para ter presença digital profissional.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {/* ✅ CORREÇÃO 4.3: Grid responsivo com empilhamento vertical no mobile */}
            {plans.map((plan, index) => (
              <Card key={index} className={`relative transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl ${
                plan.highlight 
                  ? `border-orange-500 border-2 shadow-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}` 
                  : `border-2 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`
              }`}>
                {/* 💰 CORREÇÃO PLANOS: Hover apenas com zoom 3D, sem mudança de cor */}
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    {/* 🪟 CORREÇÃO: Selo "MAIS POPULAR" centralizado horizontalmente */}
                    <Badge className="bg-orange-500 text-white px-6 py-2 text-sm font-semibold rounded-full shadow-lg">
                      MAIS POPULAR
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8 relative z-10">
                  <CardTitle className={`text-2xl font-bold transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-800'
                  }`}>{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className={`text-4xl font-bold transition-colors duration-300 ${
  isDarkMode ? 'text-orange-400' : 'text-orange-600'
}`}>R$ {plan.price}</span>
                    <span className={`transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>{plan.period}</span>
                  </div>
                  <CardDescription className={`mt-4 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 relative z-10">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3 slide-up" style={{animationDelay: `${featureIndex * 0.1}s`}}>
                        <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                        <span className={`transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-4 pt-6">
                    {/* ✅ CORREÇÃO 4.4: Espaçamento entre botões aumentado */}
                    <Button 
                      className={`w-full min-h-[48px] text-white transition-all duration-200 ease-in-out transform hover:scale-105 hover:-translate-y-1 interactive-element ${
                        plan.highlight 
                          ? 'bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-xl' 
                          : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
                      }`}
                      size="lg"
                    >
                      {/* ✅ CORREÇÃO 3.4: Altura mínima 48px + transições 0.2s + feedback visual */}
                      Quero receber uma proposta
                    </Button>
                    <Button variant="outline" className={`w-full min-h-[48px] transition-all duration-200 ease-in-out transform hover:scale-105 hover:-translate-y-1 interactive-element ${
                      isDarkMode 
                        ? 'border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white' 
                        : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                    }`}>
                      {/* ✅ CORREÇÃO 3.5: Botão secundário com mesmas correções */}
                      Solicitar demonstração
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className={`section-spacing transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* ✅ CORREÇÃO 1.7: Espaçamento padronizado + modo escuro */}
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          {/* ✅ CORREÇÃO 1.8: Padding lateral consistente */}
          <div className="text-center mb-12 lg:mb-16 fade-in-up">
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 high-contrast-text transition-colors duration-200 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-800'
            }`}>
              {/* ✅ CORREÇÃO 2.8: H2 hierarquia + contraste + modo escuro */}
              Acesse e veja qual a melhor opção para o seu negócio.
            </h2>
            <p className={`text-base lg:text-lg max-w-3xl mx-auto leading-relaxed transition-colors duration-200 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {/* ✅ CORREÇÃO 2.9: Texto corpo 16px + modo escuro */}
              Sites responsivos e modernos que ajudam empresas a crescer online
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* ✅ CORREÇÃO 4.5: Grid responsivo com empilhamento vertical */}
            <div className="fade-in-up-delay-1 relative overflow-hidden rounded-lg">
              {/* 🖼️ CORREÇÃO CARROSSEL: Carrossel automático com efeito 3D */}
              <div className="relative h-80 lg:h-96">
                <div className="relative h-80 lg:h-96">
  {carouselImages1.map((item, index) => (
    <a 
      key={index}
      href={item.link} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`absolute inset-0 w-full h-full block transition-all duration-1000 ease-in-out transform hover:scale-105 hover:rotate-1 hover:shadow-2xl ${
        index === currentCarouselImage1 
          ? 'opacity-100 translate-x-0' 
          : 'opacity-0 translate-x-full'
      }`}
    >
      <img 
        src={item.image} 
        alt={`Mockup ${index + 1} de sites responsivos exibidos em diferentes dispositivos mostrando adaptação perfeita`}
        className="w-full h-full object-cover rounded-lg"
        loading="lazy"
      />
    </a>
  ))}
  {/* Indicadores do carrossel (mantenha igual) */}
  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
    {carouselImages1.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentCarouselImage1(index)}
        className={`w-3 h-3 rounded-full transition-all duration-300 ${
          index === currentCarouselImage1 
            ? 'bg-orange-500 scale-125' 
            : 'bg-white/50 hover:bg-white/75'
        }`}
      />
    ))}
  </div>
</div>
                {/* Indicadores do carrossel */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {carouselImages1.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCarouselImage1(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentCarouselImage1 
                          ? 'bg-orange-500 scale-125' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-6 fade-in-up-delay-2">
              <h3 className={`text-xl lg:text-2xl font-bold transition-colors duration-200 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-800'
              }`}>
                {/* ✅ CORREÇÃO 2.10: H3 hierarquia corrigida */}
                Design responsivo que funciona em todos os dispositivos
              </h3>
              <p className={`text-base lg:text-lg leading-relaxed transition-colors duration-200 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Nossos sites se adaptam perfeitamente a computadores, tablets e smartphones, 
                garantindo uma experiência excelente para todos os seus clientes.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-orange-500" />
                  <span className={`text-sm lg:text-base transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Layout otimizado para mobile</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-orange-500" />
                  <span className={`text-sm lg:text-base transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Carregamento rápido</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-orange-500" />
                  <span className={`text-sm lg:text-base transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>SEO otimizado</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-orange-500" />
                  <span className={`text-sm lg:text-base transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Tema escuro e claro (botão no cabeçalho)</span>
                </li>
              </ul>
              <Button className="min-h-[48px] bg-orange-500 hover:bg-orange-600 text-white transition-all duration-200 ease-in-out hover:-translate-y-1 interactive-element"
                onClick={() => window.open('https://api.whatsapp.com/send?phone=5511932691882&text=Ol%C3%A1,%20tudo%20bem!%20Gostaria%20de%20saber%20mais%20sobre%20o%20servi%C3%A7o%20de%20rastreamento.&utm_source=site&utm_medium=botao&utm_campaign=geral', '_blank')}>
                {/* ✅ CORREÇÃO 3.6: Botão com altura mínima e transições corretas */}
                Ver mais exemplos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mt-20">
            <div className="space-y-6 lg:order-2">
              <h3 className={`text-3xl font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-800'
              }`}>
                {/* 🎨 CORREÇÃO: Texto azul convertido para cinza escuro */}
                Portfólio diversificado para todos os segmentos
              </h3>
              <p className={`text-lg transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {/* 🎨 CORREÇÃO: Texto azul convertido para cinza escuro */}
                Já criamos sites para acadêmias, Dentista, Fisioterapeutas, lojas, restaurantes e muito mais. 
                Cada projeto é pensado e desenvolvido para sua empresa.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className={`text-center p-4 rounded-lg transition-colors duration-300 ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                }`}>
                  <div className={`text-2xl font-bold transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-800'
                  }`}>200+</div>
                  <div className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>Sites criados</div>
                </div>
                <div className={`text-center p-4 rounded-lg transition-colors duration-300 ${
                  isDarkMode ? 'bg-gray-800' : 'bg-orange-50'
                }`}>
                  <div className="text-2xl font-bold text-orange-600">98%</div>
                  <div className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>Clientes satisfeitos</div>
                </div>
              </div>
            </div>
            <div className="lg:order-1">
              <a 
  href="https://www.connectcar123.com" 
  target="_blank" 
  rel="noopener noreferrer"
  className="block"
>
  <img 
    src={websiteShowcaseImage} 
    alt="Showcase de sites profissionais"
    className="w-full rounded-lg shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
  />
</a>
              {/* 🖼️ CORREÇÃO: Animação de zoom suave adicionada (sem rotação) */}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-20 transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' 
          : 'bg-gradient-to-br from-blue-900 to-blue-800 text-white'
      }`}>
        {/* 🌙 CORREÇÃO MODO ESCURO: Suporte ao modo escuro na seção de depoimentos */}
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Histórias de sucesso
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Depoimentos de empresários que transformaram seus negócios com nossos sites profissionais
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-blue-100 mb-4 italic">"{testimonial.comment}"</p>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-blue-200 text-sm">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Section */}
      <section className={`py-20 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* 🌙 CORREÇÃO MODO ESCURO: Suporte ao modo escuro na seção da empresa */}
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className={`text-4xl lg:text-5xl font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-800'
                }`}>
                  {/* 🎨 CORREÇÃO TIPOGRAFIA: Cor cinza escuro ao invés de azul */}
                  Conheça melhor quem cuida do seu site
                </h2>
                <div className="w-24 h-1 bg-orange-500"></div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <Users className={`w-8 h-8 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-100' : 'text-gray-800'
                    }`}>5+ anos no mercado</h3>
                    <p className={`transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>criando sites profissionais</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                    <Shield className="w-8 h-8 text-orange-600" />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-100' : 'text-gray-800'
                    }`}>Satisfação garantida</h3>
                    <p className={`transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>empresas atendidas com excelência</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-yellow-100'
                  }`}>
                    <Zap className={`w-8 h-8 transition-colors duration-300 ${
                      isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-100' : 'text-gray-800'
                    }`}>Experiência e compromisso</h3>
                    <p className={`transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>Profissionais focados no cliente e em seus projetos</p>
                  </div>
                </div>
              </div>

              <p className={`text-lg transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {/* 🎨 CORREÇÃO: Texto azul convertido para cinza escuro */}
                A ConnectWeb acredita que sua missão é proporcionar crescimento e sucesso às empresas 
                através de sites profissionais que realmente convertem visitantes em clientes.
              </p>

              <Button className="bg-orange-500 hover:bg-orange-600 text-white" size="lg"
                onClick={() => window.open('https://api.whatsapp.com/send?phone=5511932691882&text=Ol%C3%A1,%20tudo%20bem!%20Gostaria%20de%20saber%20mais%20sobre%20o%20servi%C3%A7o%20de%20rastreamento.&utm_source=site&utm_medium=botao&utm_campaign=geral', '_blank')}>
                Saiba mais sobre nós
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* 🖼️ CORREÇÃO 3: Zoom suave com sombreamento específico nas imagens */}
              <img 
                src={happyClientsImage} 
                alt="Clientes satisfeitos da ConnectWeb em reunião de negócios demonstrando sucesso"
                className="w-full rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                style={{
                  boxShadow: 'hover:0px 10px 24px rgba(0,0,0,0.15)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow = '0px 10px 24px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = '';
                }}
              />
              <img 
                src={businessPeopleImage} 
                alt="Equipe profissional da ConnectWeb trabalhando em projetos de sites"
                className="w-full rounded-lg shadow-lg mt-8 transition-all duration-300 ease-in-out transform hover:scale-105"
                style={{
                  boxShadow: 'hover:0px 10px 24px rgba(0,0,0,0.15)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow = '0px 10px 24px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = '';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className={`py-20 transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
          : 'bg-gradient-to-br from-blue-50 to-orange-50'
      }`}>
        {/* 🌙 CORREÇÃO 4: Modo escuro funcionando na seção de parceria */}
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className={`text-4xl lg:text-5xl font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-800'
              }`}>
                {/* 🎨 CORREÇÃO 5: Azul convertido para cinza escuro + modo escuro */}
                Seja um parceiro ConnectWeb
              </h2>
              <p className={`text-lg transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {/* 🎨 CORREÇÃO 5: Azul convertido para cinza escuro + modo escuro */}
                Venha empreender conosco! Amplie seus horizontes e ganhos sendo um parceiro ConnectWeb, 
                uma empresa em crescimento no mercado de criação de sites profissionais, 
                reconhecida pela qualidade e com mais de 200 sites online.
              </p>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white" size="lg"
                onClick={() => window.open('https://api.whatsapp.com/send?phone=5511932691882&text=Ol%C3%A1,%20tudo%20bem!%20Gostaria%20de%20saber%20mais%20sobre%20o%20servi%C3%A7o%20de%20rastreamento.&utm_source=site&utm_medium=botao&utm_campaign=geral', '_blank')}>
                Quero ser parceiro
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="text-center">
              <div className={`w-64 h-64 rounded-full mx-auto flex items-center justify-center transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-gray-700 to-gray-600' 
                  : 'bg-gradient-to-br from-blue-100 to-orange-100'
              }`}>
                <div className="text-center">
                  <Users className={`w-16 h-16 mx-auto mb-4 transition-colors duration-300 ${
                    isDarkMode ? 'text-orange-400' : 'text-blue-600'
                  }`} />
                  <h3 className={`text-2xl font-bold transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-800'
                  }`}>Parceria</h3>
                  <p className={`transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>Lucrativa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
<section className={`py-20 transition-colors duration-300 ${
  isDarkMode ? 'bg-gray-900' : 'bg-white'
}`}>
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className={`text-4xl lg:text-5xl font-bold mb-6 transition-colors duration-300 ${
        isDarkMode ? 'text-gray-100' : 'text-gray-800'
      }`}>
        Perguntas frequentes
      </h2>
      <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
    </div>

    <div className="max-w-4xl mx-auto space-y-6 perspective-1000">
      {faqItems.map((item, index) => (
        <div
          key={index}
          className="faq-3d-container transform-style-3d"
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateZ(15px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateZ(0px) scale(1)';
            e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.08)';
          }}
        >
          <Card className={`border-2 transition-all duration-500 ease-out ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700 hover:border-orange-500/60' 
              : 'bg-white border-gray-200 hover:border-orange-500/60'
          }`}>
            <CardHeader className="pb-4">
              <CardTitle className={`flex items-center justify-between transition-colors duration-300 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-800'
              }`}>
                <span className="flex items-center text-lg font-semibold">
                  <span className={`w-2 h-2 rounded-full mr-3 transition-colors duration-300 ${
                    isDarkMode ? 'bg-orange-500' : 'bg-orange-500'
                  }`}></span>
                  {item.question}
                </span>
                <div className="flex items-center space-x-2">
                  <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                    isDarkMode ? 'bg-orange-400' : 'bg-orange-500'
                  }`}></div>
                  <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${
                    isDarkMode ? 'text-orange-400' : 'text-orange-500'
                  }`} />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`pl-5 border-l-2 transition-all duration-500 ${
                isDarkMode ? 'border-orange-500/40' : 'border-orange-500/40'
              }`}>
                <p className={`transition-colors duration-300 text-base leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {item.answer}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>

    <div className="text-center mt-12">
      <Button 
        variant="outline" 
        className="border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-105 group"
        size="lg"
        onClick={() => window.open('https://api.whatsapp.com/send?phone=5511932691882&text=Ol%C3%A1,%20tudo%20bem!%20Gostaria%20de%20saber%20mais%20sobre%20o%20servi%C3%A7o%20de%20rastreamento.&utm_source=site&utm_medium=botao&utm_campaign=geral', '_blank')}
      >
        Ver todas as dúvidas
        <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
      </Button>
    </div>
  </div>

  <style jsx>{`
    .perspective-1000 {
      perspective: 1000px;
    }
    
    .faq-3d-container {
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      transform-style: preserve-3d;
      transform: translateZ(0px) scale(1);
      box-shadow: 0 5px 15px rgba(0,0,0,0.08);
      border-radius: 12px;
    }
    
    .transform-style-3d {
      transform-style: preserve-3d;
    }
    
    .faq-3d-container:hover {
      z-index: 10;
    }
    
    .faq-3d-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, 
        rgba(249, 115, 22, 0.05) 0%, 
        transparent 50%, 
        rgba(249, 115, 22, 0.02) 100%);
      border-radius: inherit;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }
    
    .faq-3d-container:hover::before {
      opacity: 1;
    }
  `}</style>
</section>

      {/* {/* Contact Section */}
<section id="contato" className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-4xl lg:text-5xl font-bold mb-6">
        Atendimento ConnectWeb
      </h2>
      <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
      <a href="https://api.whatsapp.com/send?phone=5511932691882&text=Ol%C3%A1,%20tudo%20bem!%20Gostaria%20de%20saber%20mais%20sobre%20o%20servi%C3%A7o%20de%20rastreamento.&utm_source=site&utm_medium=botao&utm_campaign=geral" target="_blank" rel="noopener noreferrer" className="block">
        <Card className="bg-white/10 backdrop-blur-sm border-orange-500 border-2 text-white text-center hover:bg-white/20 transition-all cursor-pointer">
          <CardContent className="p-6">
            <MessageCircle className="w-12 h-12 text-orange-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">WhatsApp</h3>
            <p className="text-blue-100">Atendimento rápido e exclusivo</p>
          </CardContent>
        </Card>
      </a>

      <a href="https://www.connectcar123.com" target="_blank" rel="noopener noreferrer" className="block">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white text-center hover:bg-white/20 transition-all cursor-pointer">
          <CardContent className="p-6">
            <Headphones className="w-12 h-12 text-blue-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">Fale Conosco</h3>
            <p className="text-blue-100">Deixe uma sugestão</p>
          </CardContent>
        </Card>
      </a>

      <a href="https://www.connectcar123.com" target="_blank" rel="noopener noreferrer" className="block">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white text-center hover:bg-white/20 transition-all cursor-pointer">
          <CardContent className="p-6">
            <Monitor className="w-12 h-12 text-blue-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">Demonstração</h3>
            <p className="text-blue-100">Acesse nossos modelos de site</p>
          </CardContent>
        </Card>
      </a>

      <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className="block">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white text-center hover:bg-white/20 transition-all cursor-pointer">
          <CardContent className="p-6">
            <Mail className="w-12 h-12 text-blue-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">E-mail</h3>
            <p className="text-blue-100">Contate-nos através do e-mail</p>
          </CardContent>
        </Card>
      </a>

      <a href="https://www.connectcar123.com" target="_blank" rel="noopener noreferrer" className="block">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white text-center hover:bg-white/20 transition-all cursor-pointer">
          <CardContent className="p-6">
            <Globe className="w-12 h-12 text-blue-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">Atendimento</h3>
            <p className="text-blue-100">Tire sua dúvida com a gente</p>
          </CardContent>
        </Card>
      </a>
    </div>
  </div>
</section>

      {/* Contact Form Section */}
      <section id="formulário" className={`py-20 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className={`text-4xl lg:text-5xl font-bold mb-6 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-800'
              }`}>
                Solicite seu Orçamento
              </h2>
              <p className={`text-xl transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Preencha o formulário e receba uma proposta personalizada para seu projeto
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className={`text-2xl font-bold mb-6 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-800'
                }`}>
                  Por que escolher a ConnectWeb?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className={`font-semibold transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-100' : 'text-gray-800'
                      }`}>Sites Responsivos</h4>
                      <p className={`transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>Funcionam perfeitamente em todos os dispositivos</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className={`font-semibold transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-100' : 'text-gray-800'
                      }`}>Tema Claro e Escuro</h4>
                      <p className={`transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>Cor de fundo adaptável com um clique (botão no cabeçalho).</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className={`font-semibold transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-100' : 'text-gray-800'
                      }`}>Entrega Rápida</h4>
                      <p className={`transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>Seu site pronto em até 10 dias úteis</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`p-8 rounded-2xl shadow-xl transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'
              }`}>
                <form id="formulário-contato" className="space-y-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Digite seu nome completo"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="(11) 99999-9999"
                    />
                  </div>

<div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Mensagem
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Conte-nos sobre seu projeto..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Solicitar Orçamento</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-800 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Aumente o alcance da sua empresa online.
              <br />
          
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 text-lg"
                onClick={() => window.open('https://api.whatsapp.com/send?phone=5511932691882&text=Ol%C3%A1,%20tudo%20bem!%20Gostaria%20de%20saber%20mais%20sobre%20o%20servi%C3%A7o%20de%20rastreamento.&utm_source=site&utm_medium=botao&utm_campaign=geral', '_blank')}>
                <MessageCircle className="w-5 h-5 mr-2" />
                Quero receber uma proposta
              </Button>
              <Button size="lg" className="bg-blue-800 hover:bg-blue-900 text-white border-2 border-blue-800 hover:border-blue-900 px-8 py-4 text-lg transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-105"
                onClick={() => window.open('https://api.whatsapp.com/send?phone=5511932691882&text=Ol%C3%A1,%20tudo%20bem!%20Gostaria%20de%20saber%20mais%20sobre%20o%20servi%C3%A7o%20de%20rastreamento.&utm_source=site&utm_medium=botao&utm_campaign=geral', '_blank')}>
                {/* 🚀 CORREÇÃO CTA: Botão com contraste adequado - fundo azul escuro + texto branco */}
                Solicitar demonstração
              </Button>
            </div>
          </div>
        </div>
      </section>
      
{/* Footer */}
      <footer className={`py-12 border-t transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    className="focus:outline-none"
  >
    <div className="flex items-center justify-center">
      <img 
        src="https://i.ibb.co/PsQ1TpFd/RODA-P-LOGO-8.png" 
        alt="ConnectWeb" 
        className="h-10 w-auto"
      />
    </div>
  </button>
  <span className={`text-2xl font-bold transition-colors duration-300 ${
    isDarkMode ? 'text-gray-100' : 'text-gray-800'
  }`}></span>
</div>
              <p className={`mb-4 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Criando sites profissionais que fazem sua empresa crescer digitalmente.
              </p>
              <div className="flex space-x-4">
                {/* 📍 Google Meu Negócio */}
                <a 
                  href="https://www.google.com/maps/place/Rastreamento+Automotivo+ConnectCar/@-23.8886333,-46.7393688,254391m/data=!3m2!1e3!4b1!4m6!3m5!1s0x6b94f1ca0b7a1f61:0xf0b8819b67f7b3a3!8m2!3d-23.8886334!4d-46.7393688!16s%2Fg%2F11rq8w4xzg?entry=ttu&g_ep=EgoyMDI1MDYyNi4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors duration-300 hover:scale-105 transform border border-gray-300 shadow-sm p-2"
                  aria-label="Google Meu Negócio ConnectWeb"
                >
                  {/* Imagem do Google Meu Negócio com dimensões 400x100 */}
                  <img 
                    src="https://i.ibb.co/ynMGF25p/RODA-P-IMAGEM-GOOGLE-MEU-NEG-CIO-DEFINITIVA.png" 
                    alt="Google Meu Negócio" 
                    className="w-[200px] h-[30px] object-contain"
                    width="400"
                    height="100"
                  />
                </a>
              </div>
            </div>

            <div>
              <h3 className={`text-lg font-bold mb-4 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-800'
              }`}>Sites Profissionais</h3>
              <ul className={`space-y-2 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <li><button onClick={() => scrollToSection('planos')} className="hover:text-orange-600 transition-colors duration-300 text-left">Plano Essencial</button></li>
                <li><button onClick={() => scrollToSection('planos')} className="hover:text-orange-600 transition-colors duration-300 text-left">Plano Popular</button></li>
                <li><button onClick={() => scrollToSection('portfolio')} className="hover:text-orange-600 transition-colors duration-300 text-left">Sites Personalizados</button></li>
              </ul>
            </div>

            <div>
              <h3 className={`text-lg font-bold mb-4 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-800'
              }`}>Serviços</h3>
              <ul className={`space-y-2 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <li className="hover:text-orange-600 transition-colors duration-300">Rua Barão do Rio Branco - Stella Maris - Peruíbe/SP</li>
                <li>
                  <a 
                    href="https://api.whatsapp.com/send?phone=5511932691882&text=Olá" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-orange-600 transition-colors duration-300"
                  >
                    (11) 93269-1882
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:contato@connectweb.com" 
                    className="hover:text-orange-600 transition-colors duration-300"
                  >
                    contato@connectweb.com
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className={`text-lg font-bold mb-4 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-800'
              }`}>Links Rápidos</h3>
              <ul className={`space-y-2 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <li><button onClick={() => scrollToSection('sites')} className={`hover:text-orange-600 transition-colors duration-300 text-left ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Sites Profissionais</button></li>
                <li><button onClick={() => scrollToSection('planos')} className={`hover:text-orange-600 transition-colors duration-300 text-left ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Planos</button></li>
                <li><button onClick={() => scrollToSection('portfolio')} className={`hover:text-orange-600 transition-colors duration-300 text-left ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Portfólio</button></li>
                <li><button onClick={() => scrollToSection('formulário')} className={`hover:text-orange-600 transition-colors duration-300 text-left ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Formulário</button></li>
                <li><button onClick={() => scrollToSection('contato')} className={`hover:text-orange-600 transition-colors duration-300 text-left ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Contato</button></li>
              </ul>
            </div>
          </div>

          <div className={`border-t mt-8 pt-8 text-center transition-colors duration-300 ${
            isDarkMode 
              ? 'border-gray-700 text-gray-300' 
              : 'border-gray-200 text-gray-600'
          }`}>
            <p>&copy; 2026 ConnectCar. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
      <ChatBot isDarkMode={isDarkMode} />
    </div>
  )
}

export default App

