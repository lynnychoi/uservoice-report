"use client";

import { useState, useEffect } from "react";
import { colors } from "@/lib/tokens/colors";
import { typography } from "@/lib/tokens/typography";
import { spacing, shadows } from "@/lib/tokens/spacing";
import { copyToClipboard } from "@/lib/utils";
import { Copy, Check } from "lucide-react";
import { Header } from "@/components/header";
import * as Icons from "@/lib/components/icons";

const ColorPalette = ({ title, colorGroup }: { title: string; colorGroup: Record<string, string> }) => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleCopyColor = async (colorValue: string, colorName: string) => {
    await copyToClipboard(colorValue);
    setCopiedColor(colorName);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 capitalize">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-3">
        {Object.entries(colorGroup).map(([shade, color]) => (
          <div
            key={shade}
            className="group relative cursor-pointer"
            onClick={() => handleCopyColor(color, `${title}-${shade}`)}
          >
            <div
              className="w-full h-16 rounded-lg shadow-sm border border-gray-200 group-hover:scale-105 transition-transform"
              style={{ backgroundColor: color }}
            />
            <div className="mt-2 text-center">
              <div className="text-xs font-medium text-gray-900">{shade}</div>
              <div className="text-xs text-gray-500 font-mono">{color}</div>
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-black/80 text-white p-1 rounded text-xs flex items-center gap-1">
                {copiedColor === `${title}-${shade}` ? (
                  <>
                    <Check className="w-3 h-3" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TypographyExample = ({ size, example }: { size: string; example: string | readonly [string, { readonly lineHeight?: string; readonly letterSpacing?: string }] }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(`text-${size}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const fontSize = Array.isArray(example) ? example[0] : example;
  const lineHeight = Array.isArray(example) && example[1]?.lineHeight ? example[1].lineHeight : 'normal';

  return (
    <div 
      className="group flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={handleCopy}
    >
      <div className="flex items-center gap-4">
        <div 
          className="text-gray-900"
          style={{ fontSize, lineHeight }}
        >
          The quick brown fox jumps over the lazy dog
        </div>
        <div className="flex flex-col text-sm text-gray-500">
          <span className="font-mono">{fontSize}</span>
          <span className="font-mono text-xs">{lineHeight}</span>
        </div>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : `text-${size}`}
        </div>
      </div>
    </div>
  );
};

const IconsGrid = () => {
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  const handleCopyIcon = async (iconName: string) => {
    await copyToClipboard(`<${iconName} className="w-6 h-6" />`);
    setCopiedIcon(iconName);
    setTimeout(() => setCopiedIcon(null), 1500);
  };

  const iconComponents = Object.entries(Icons).filter(([name]) => name.endsWith('Icon'));

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
      {iconComponents.map(([iconName, IconComponent]) => {
        const displayName = iconName.replace('Icon', '');
        return (
          <div
            key={iconName}
            className="group relative cursor-pointer p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex flex-col items-center gap-3"
            onClick={() => handleCopyIcon(iconName)}
          >
            <div className="flex items-center justify-center w-8 h-8 text-gray-700">
              <IconComponent size={24} />
            </div>
            <div className="text-xs text-center">
              <div className="font-medium text-gray-900">{displayName}</div>
              <div className="text-gray-500 font-mono text-xs">{iconName}</div>
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-black/80 text-white p-1 rounded text-xs flex items-center gap-1">
                {copiedIcon === iconName ? (
                  <>
                    <Check className="w-3 h-3" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default function FoundationPage() {
  const [activeSection, setActiveSection] = useState("colors");

  const sections = [
    { id: "colors", label: "Colors" },
    { id: "typography", label: "Typography" },
    { id: "spacing", label: "Spacing" },
    { id: "shadows", label: "Shadows" },
    { id: "icons", label: "Icons" },
  ];

  const handleSectionClick = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // 스크롤에 따른 섹션 감지 (시각적 표시만)
  useEffect(() => {
    const sectionElements = sections.map(section => document.getElementById(section.id)).filter(Boolean) as HTMLElement[];
    
    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let currentSection = '';
        
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            currentSection = entry.target.id;
          }
        });
        
        if (currentSection) {
          setActiveSection(currentSection);
        }
      },
      {
        rootMargin: "-150px 0px -50% 0px",
        threshold: Array.from({ length: 21 }, (_, i) => i * 0.05),
      }
    );

    sectionElements.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionElements.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Page Header */}
      <div className="border-b bg-white sticky top-[65px] z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Foundation</h1>
              <p className="text-gray-600">디자인 시스템의 기초 요소들</p>
            </div>
            
            {/* Mini-map Navigation */}
            <nav className="flex flex-col gap-3">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionClick(section.id)}
                  className="group flex items-center gap-3 text-right"
                >
                  <span className={`text-xs font-medium transition-colors ${
                    activeSection === section.id 
                      ? "text-primary-600" 
                      : "text-gray-400 group-hover:text-gray-600"
                  }`}>
                    {section.label}
                  </span>
                  <div className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    activeSection === section.id 
                      ? "bg-primary-600 scale-125" 
                      : "bg-gray-300 group-hover:bg-gray-400"
                  }`} />
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 pr-16">
        {/* Colors */}
        <section id="colors" className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Colors</h2>
            <p className="text-gray-600">브랜드 색상과 시맨틱 컬러 팔레트</p>
          </div>

          <div className="space-y-8">
            <ColorPalette title="primary" colorGroup={colors.primary} />
            <ColorPalette title="gray" colorGroup={colors.gray} />
            <ColorPalette title="success" colorGroup={colors.success} />
            <ColorPalette title="warning" colorGroup={colors.warning} />
            <ColorPalette title="error" colorGroup={colors.error} />
            <ColorPalette title="info" colorGroup={colors.info} />
          </div>
        </section>

        {/* Typography */}
        <section id="typography" className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Typography</h2>
            <p className="text-gray-600">텍스트 크기와 줄 간격 정의</p>
          </div>

          <div className="space-y-3">
            {Object.entries(typography.fontSize).map(([size, example]) => (
              <TypographyExample key={size} size={size} example={example} />
            ))}
          </div>
        </section>

        {/* Spacing */}
        <section id="spacing" className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Spacing</h2>
            <p className="text-gray-600">여백과 간격 토큰</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(spacing).slice(0, 20).map(([key, value]) => (
              <div key={key} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                <div 
                  className="bg-primary-200 rounded"
                  style={{ width: value, height: '16px', minWidth: '4px' }}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">{key}</span>
                  <span className="text-xs text-gray-500 font-mono">{value}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Shadows */}
        <section id="shadows" className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Shadows</h2>
            <p className="text-gray-600">그림자 효과 토큰</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(shadows).filter(([key]) => key !== 'none').map(([key, value]) => (
              <div key={key} className="p-6 bg-gray-50 rounded-lg">
                <div 
                  className="w-full h-20 bg-white rounded-lg mb-4"
                  style={{ boxShadow: value }}
                />
                <div className="text-sm font-medium text-gray-900 mb-1">{key}</div>
                <div className="text-xs text-gray-500 font-mono break-all">{value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Icons */}
        <section id="icons" className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Icons</h2>
            <p className="text-gray-600">채널톡에서 사용되는 아이콘 라이브러리</p>
          </div>

          <IconsGrid />
        </section>
      </div>
    </div>
  );
}