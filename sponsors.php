<?php
$pageTitle = 'For Sponsors — Dallas Clinicals';
$pageScript = '/assets/js/sponsors.js';
include __DIR__ . '/includes/header.php';
?>
<div class="w-full">
  <!-- Header -->
  <section class="bg-brand-900 text-white py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto text-center">
      <h1 class="anim-in text-4xl md:text-5xl font-display font-bold mb-6">The DFW Sponsor Portal</h1>
      <p class="anim-in delay-1 text-xl text-gray-300 max-w-3xl mx-auto">
        Accelerate your clinical trials with our Dual-Site model, offering unparalleled access to the diverse demographics of Collin and Hunt counties.
      </p>
    </div>
  </section>

  <!-- Advantages -->
  <section class="py-20 bg-white px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div class="p-8 bg-gray-50 rounded-2xl border border-gray-100">
          <div class="w-14 h-14 bg-accent-500/10 rounded-xl flex items-center justify-center mb-6">
            <i data-lucide="users" class="w-7 h-7 text-accent-600"></i>
          </div>
          <h3 class="text-xl font-bold text-brand-900 mb-3">DFW Recruitment Advantage</h3>
          <p class="text-gray-600">Offices in Plano and Greenville provide access to a massive, diverse demographic, ensuring rapid and representative enrollment.</p>
        </div>
        <div class="p-8 bg-gray-50 rounded-2xl border border-gray-100">
          <div class="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
            <i data-lucide="target" class="w-7 h-7 text-blue-600"></i>
          </div>
          <h3 class="text-xl font-bold text-brand-900 mb-3">Enrollment Excellence</h3>
          <p class="text-gray-600">Internal expertise in site dynamics and participant demographics. Our Dual-Site model significantly reduces study timelines.</p>
        </div>
        <div class="p-8 bg-gray-50 rounded-2xl border border-gray-100">
          <div class="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
            <i data-lucide="activity" class="w-7 h-7 text-purple-600"></i>
          </div>
          <h3 class="text-xl font-bold text-brand-900 mb-3">High-Tech Infrastructure</h3>
          <p class="text-gray-600">Leveraging the prestige of the Plano tech corridor with 2026-standard data encryption, EDC proficiency, and strict GCP compliance.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Form -->
  <section class="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
    <div class="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
      <div class="bg-brand-900 p-8 text-center">
        <h2 class="text-2xl font-display font-bold text-white mb-2">Protocol Implementation Inquiry</h2>
        <p class="text-accent-400 text-sm">Direct all inquiries to Shams Islam, Director of Research</p>
      </div>

      <div class="p-8">
        <div id="sponsor-success" class="anim-in-scale text-center py-12 hidden">
          <i data-lucide="check-circle" class="w-16 h-16 text-green-500 mx-auto mb-4"></i>
          <h3 class="text-2xl font-bold text-brand-900 mb-2">Inquiry Received</h3>
          <p class="text-gray-600">Thank you. Shams Islam or a member of our research team will contact you within 24 hours.</p>
        </div>

        <form id="sponsor-form" class="space-y-6">
          <!-- Honeypot field to prevent spam -->
          <input type="text" name="_honey" style="display:none" />
          <input type="hidden" name="_captcha" value="false" />

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input required type="text" name="fullName" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all" placeholder="Jane Doe" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Company / CRO</label>
              <input required type="text" name="company" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all" placeholder="Pharma Corp" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input required type="email" name="email" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all" placeholder="jane@pharmacorp.com" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input required type="tel" name="phone" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all" placeholder="(555) 123-4567" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Therapeutic Area</label>
            <select name="therapeuticArea" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all">
              <option>Dermatology</option>
              <option>Endocrinology</option>
              <option>Metabolism (GLP-1/Obesity)</option>
              <option>Respiratory</option>
              <option>Infectious Diseases</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Protocol Details / Message</label>
            <textarea required name="message" rows="4" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all" placeholder="Brief description of the study phase and requirements..."></textarea>
          </div>

          <button type="submit" id="sponsor-submit" class="w-full bg-brand-900 text-white font-bold py-4 rounded-lg hover:bg-brand-800 active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 transition-[background-color,transform] duration-150 flex items-center justify-center space-x-2">
            <span id="sponsor-submit-label">Submit Inquiry to Director</span>
            <i data-lucide="send" id="sponsor-submit-icon" class="w-4 h-4"></i>
          </button>
        </form>
      </div>
    </div>
  </section>
</div>
<?php include __DIR__ . '/includes/footer.php'; ?>
