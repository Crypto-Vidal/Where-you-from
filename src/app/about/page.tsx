'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-brand-green-50 via-white to-brand-teal-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6">
              Our Minnesota Story
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              Born and bred in the Land of 10,000 Lakes, we're more than just a clothing brand.
              We're a celebration of Minnesota pride, community, and the friendly spirit that makes our state special.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-neutral-900">
                Where We're From
              </h2>
              <div className="space-y-4 text-lg text-neutral-700 leading-relaxed">
                <p>
                  It started with a simple question: "Where you from?" In Minnesota, it's not just small talk—
                  it's how we connect, how we find common ground, and how we welcome newcomers into our community.
                </p>
                <p>
                  Founded in 2020 in Minneapolis, Where You From was born from a desire to celebrate everything
                  that makes Minnesota unique. From our stunning lakes and forests to our vibrant cities, from
                  our legendary winters to our incredible summers, we wanted to create clothing that captures
                  the essence of the North Star State.
                </p>
                <p>
                  But more than that, we wanted to embody the spirit of "Minnesota Nice"—the warmth, friendliness,
                  and genuine care for others that defines our community. Every piece we create is designed to
                  spark conversations, build connections, and remind people of the pride we share in calling
                  Minnesota home.
                </p>
              </div>
            </div>

            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800"
                alt="Minnesota landscape"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              What We Stand For
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Our values guide everything we do, from design to production to customer service.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: '🌟',
                title: 'Local Pride',
                description: 'Every design celebrates Minnesota\'s unique culture, landscapes, and communities. We source locally and support Minnesota makers whenever possible.',
              },
              {
                icon: '♻️',
                title: 'Sustainability',
                description: 'We\'re committed to eco-friendly production practices, sustainable materials, and reducing our environmental footprint.',
              },
              {
                icon: '🤝',
                title: 'Community First',
                description: 'Like true Minnesotans, we believe in giving back. A portion of every sale supports local Minnesota charities and community organizations.',
              },
              {
                icon: '✨',
                title: 'Quality Craftsmanship',
                description: 'We use premium materials and meticulous attention to detail to create clothing that lasts. No shortcuts, no compromises.',
              },
              {
                icon: '❤️',
                title: 'Minnesota Nice',
                description: 'Friendly, welcoming, and genuinely caring—we bring the spirit of Minnesota Nice to every customer interaction.',
              },
              {
                icon: '🎨',
                title: 'Creative Expression',
                description: 'We celebrate the diverse, vibrant creativity that makes Minnesota special, from street art to natural beauty.',
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-soft hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Minnesota Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-neutral-900 mb-6">
              From the North Shore to the Twin Cities
            </h2>
            <p className="text-lg text-neutral-600 mb-12">
              Our designs are inspired by every corner of Minnesota—from Duluth to Rochester,
              from the Boundary Waters to the Mississippi River.
            </p>

            <div className="grid md:grid-cols-2 gap-8 text-left">
              {[
                {
                  title: 'Twin Cities Born',
                  description: 'Based in Minneapolis-St. Paul, the beating heart of Minnesota culture and creativity.',
                },
                {
                  title: '10,000 Lakes Inspired',
                  description: 'Our designs reflect the natural beauty that surrounds us year-round.',
                },
                {
                  title: 'North Star Guided',
                  description: 'Like our state motto, we aim to be the "Star of the North" in sustainable fashion.',
                },
                {
                  title: 'Community Connected',
                  description: 'Supporting local artists, makers, and organizations across the state.',
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-brand rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-brand text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Join the Minnesota Movement
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Whether you're a lifelong Minnesotan or just visiting, wear your pride and
            share your story with Where You From.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/collections/all"
              className="inline-block px-8 py-4 bg-white text-brand-green-600 rounded-lg font-bold hover:bg-neutral-100 transition-colors"
            >
              Shop the Collection
            </a>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
