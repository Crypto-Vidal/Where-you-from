'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { SocialPost } from '@/types';
import { FaInstagram, FaTiktok, FaTwitter } from 'react-icons/fa';

interface SocialGalleryProps {
  posts: SocialPost[];
}

export default function SocialGallery({ posts }: SocialGalleryProps) {
  const platformIcons = {
    instagram: <FaInstagram className="w-5 h-5" />,
    tiktok: <FaTiktok className="w-5 h-5" />,
    twitter: <FaTwitter className="w-5 h-5" />,
  };

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-gradient-holographic text-white rounded-full text-sm font-medium mb-4 animate-gradient bg-[length:200%_200%]">
            📸 As Seen On Socials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Share Your Minnesota Pride
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Tag us <span className="font-semibold text-brand-green-600">@whereyoufrom</span> for a chance to be featured!
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post, index) => (
            <motion.a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
            >
              {/* Image */}
              <Image
                src={post.image}
                alt="Customer photo"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      {platformIcons[post.platform]}
                      <span className="text-sm font-medium">
                        {post.likes.toLocaleString()}
                      </span>
                    </div>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Platform Badge */}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity">
                {platformIcons[post.platform]}
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-neutral-600 mb-4">
            Follow us for more Minnesota vibes and exclusive drops
          </p>
          <div className="flex justify-center gap-4">
            {[
              { name: 'Instagram', icon: <FaInstagram className="w-6 h-6" />, link: 'https://instagram.com' },
              { name: 'TikTok', icon: <FaTiktok className="w-6 h-6" />, link: 'https://tiktok.com' },
              { name: 'Twitter', icon: <FaTwitter className="w-6 h-6" />, link: 'https://twitter.com' },
            ].map(social => (
              <a
                key={social.name}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-lg border-2 border-neutral-200 hover:border-brand-green-500 hover:bg-brand-green-50 transition-colors font-medium"
              >
                {social.icon}
                <span>{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
