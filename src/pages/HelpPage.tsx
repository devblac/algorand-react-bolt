import React, { useState } from 'react'
import { Search, ChevronDown, ChevronRight, HelpCircle, MessageCircle, Mail, Phone } from 'lucide-react'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'What is a ROSCA and how does it work?',
    answer: 'A ROSCA (Rotating Savings and Credit Association) is a group of individuals who agree to meet regularly and contribute to a fund that is given, in whole or in part, to each contributor in rotation. In CasaNest, ROSCAs are specifically designed for housing finance, allowing participants to pool resources for down payments, home purchases, or property investments.',
    category: 'basics'
  },
  {
    id: '2',
    question: 'How is my money secured on the blockchain?',
    answer: 'CasaNest uses the Algorand blockchain to ensure complete transparency and security. All transactions are recorded on the blockchain, making them immutable and verifiable. Smart contracts automate the distribution process, eliminating the need for trust in a central authority.',
    category: 'security'
  },
  {
    id: '3',
    question: 'What happens if someone defaults on their payments?',
    answer: 'CasaNest has built-in protection mechanisms including KYC verification, community vetting, and smart contract enforcement. In case of default, the remaining participants can vote on how to proceed, and insurance mechanisms help protect the group.',
    category: 'security'
  },
  {
    id: '4',
    question: 'How do I join an existing ROSCA?',
    answer: 'Browse available ROSCAs on our platform, review their terms and participant requirements, then submit a join request. The ROSCA admin and existing members will review your application based on the group\'s criteria.',
    category: 'participation'
  },
  {
    id: '5',
    question: 'Can I create my own ROSCA?',
    answer: 'Yes! You can create a ROSCA by defining the total amount, number of participants, contribution frequency, and other terms. Once created, others can discover and join your ROSCA through our platform.',
    category: 'participation'
  },
  {
    id: '6',
    question: 'What fees does CasaNest charge?',
    answer: 'CasaNest charges a small platform fee (typically 1-2%) to cover blockchain transaction costs, platform maintenance, and security features. This is significantly lower than traditional financial institutions.',
    category: 'fees'
  }
]

const categories = [
  { id: 'all', name: 'All Topics' },
  { id: 'basics', name: 'ROSCA Basics' },
  { id: 'security', name: 'Security & Trust' },
  { id: 'participation', name: 'Participation' },
  { id: 'fees', name: 'Fees & Costs' }
]

export function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Help Center
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Find answers to common questions about CasaNest and ROSCAs
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              placeholder="Search for help topics..."
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4 mb-12">
          {filteredFAQs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <button
                onClick={() => toggleExpanded(faq.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors rounded-xl"
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </h3>
                {expandedItems.has(faq.id) ? (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              {expandedItems.has(faq.id) && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Still need help?
          </h2>
          <p className="text-blue-100 mb-6">
            Our support team is here to help you succeed with your housing finance journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              <MessageCircle className="w-5 h-5 mr-2" />
              Live Chat
            </button>
            <button className="inline-flex items-center px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium">
              <Mail className="w-5 h-5 mr-2" />
              Email Support
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}