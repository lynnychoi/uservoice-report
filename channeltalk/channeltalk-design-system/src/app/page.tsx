import Link from "next/link";
import { Button } from "@/lib/components";
import { ArrowRight, Palette, Code2, Layers } from "lucide-react";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      <Header />

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            채널톡을 위한
            <br />
            <span className="text-primary-600">통합 디자인 시스템</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            일관된 사용자 경험을 위한 디자인 토큰, 컴포넌트, 패턴을 제공합니다.
            개발자와 디자이너가 함께 사용할 수 있는 통합 라이브러리입니다.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/components">
              <Button size="lg">
                컴포넌트 둘러보기
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/foundation">
              <Button variant="outline" size="lg">
                디자인 토큰 보기
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 rounded-2xl bg-white shadow-sm border">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Palette className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">디자인 토큰</h3>
            <p className="text-gray-600">
              색상, 타이포그래피, 간격 등 일관된 디자인 언어를 위한 토큰 시스템
            </p>
          </div>
          
          <div className="text-center p-6 rounded-2xl bg-white shadow-sm border">
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Layers className="w-6 h-6 text-success-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">컴포넌트 라이브러리</h3>
            <p className="text-gray-600">
              재사용 가능한 React 컴포넌트와 패턴으로 빠른 개발 지원
            </p>
          </div>
          
          <div className="text-center p-6 rounded-2xl bg-white shadow-sm border">
            <div className="w-12 h-12 bg-info-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Code2 className="w-6 h-6 text-info-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">코드 복사</h3>
            <p className="text-gray-600">
              원클릭으로 컴포넌트 코드를 복사하여 바로 프로젝트에 사용
            </p>
          </div>
        </div>

        {/* Quick Start */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">빠른 시작</h2>
          <div className="bg-gray-900 rounded-2xl p-6 max-w-2xl mx-auto text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-gray-400 text-sm">Terminal</span>
            </div>
            <pre className="text-green-400 font-mono text-sm">
{`npm install @channeltalk/design-system
# or
yarn add @channeltalk/design-system`}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
}
