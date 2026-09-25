<?php
$pageTitle = 'About Us — Dallas Clinicals';
include __DIR__ . '/includes/header.php';
?>
<div class="w-full">
  <section class="bg-brand-900 text-white py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto text-center">
      <h1 class="anim-in text-4xl md:text-5xl font-display font-bold mb-6">About Dallas Clinicals</h1>
      <p class="anim-in delay-1 text-xl text-gray-300 max-w-3xl mx-auto">
        Pioneering clinical research in the Dallas-Fort Worth metroplex through a unique blend of technological innovation and community-focused care.
      </p>
    </div>
  </section>

  <section class="py-20 bg-white px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
        <div>
          <h2 class="text-3xl font-display font-bold text-brand-900 mb-6">Our Mission</h2>
          <p class="text-lg text-gray-600 mb-6 leading-relaxed">
            To accelerate the development of life-saving therapies by providing sponsors with high-quality, rapid-enrollment clinical trial execution, while ensuring the utmost safety and care for our patient volunteers.
          </p>
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-accent-500/10 rounded-full flex items-center justify-center">
                <i data-lucide="award" class="w-6 h-6 text-accent-600"></i>
              </div>
              <span class="font-medium text-brand-900">Excellence in Protocol Execution</span>
            </div>
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                <i data-lucide="users" class="w-6 h-6 text-blue-600"></i>
              </div>
              <span class="font-medium text-brand-900">Diverse Patient Demographics</span>
            </div>
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                <i data-lucide="book-open" class="w-6 h-6 text-purple-600"></i>
              </div>
              <span class="font-medium text-brand-900">Strict Regulatory Compliance</span>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 rounded-3xl p-8 border border-gray-100">
          <h3 class="text-2xl font-display font-bold text-brand-900 mb-6">Leadership</h3>

          <div class="mb-8">
            <h4 class="text-lg font-bold text-brand-900">Hassan Farooq, MD</h4>
            <p class="text-accent-600 font-medium text-sm mb-2">Principal Investigator</p>
            <p class="text-gray-600 text-sm">
              Dr. Farooq provides expert medical oversight for all clinical trials at Dallas Clinicals. With extensive experience in internal medicine and clinical research, he ensures patient safety and protocol adherence across both the Plano and Greenville facilities.
            </p>
          </div>

          <div>
            <h4 class="text-lg font-bold text-brand-900">Shams Islam</h4>
            <p class="text-accent-600 font-medium text-sm mb-2">Director of Research</p>
            <p class="text-gray-600 text-sm">
              Overseeing facility capabilities, sponsor relations, and protocol implementation. Shams drives the operational excellence that makes Dallas Clinicals a preferred partner for CROs and pharmaceutical sponsors globally.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
<?php include __DIR__ . '/includes/footer.php'; ?>
