<?php
$pageTitle = 'Check Eligibility — Dallas Clinicals';
$pageScript = '/assets/js/eligibility.js';
include __DIR__ . '/includes/header.php';
?>
<div class="w-full min-h-[80vh] bg-gray-50 py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
  <div class="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
    <div class="bg-brand-900 p-8 text-center relative">
      <h1 class="text-3xl font-display font-bold text-white mb-2">Check Eligibility</h1>
      <p class="text-accent-400">Find active studies near you.</p>

      <!-- Progress Bar -->
      <div id="progress-wrap" class="absolute bottom-0 left-0 w-full h-1 bg-brand-800">
        <div id="progress-bar" class="h-full bg-accent-500 transition-all duration-500" style="width:50%"></div>
      </div>
    </div>

    <div class="p-8 md:p-12">
      <div id="elig-success" class="anim-in-scale text-center py-8 hidden">
        <i data-lucide="check-circle" class="w-20 h-20 text-green-500 mx-auto mb-6"></i>
        <h2 class="text-3xl font-bold text-brand-900 mb-4">You're on the list!</h2>
        <p class="text-gray-600 mb-6 text-lg">
          Your information has been securely routed to Dr. Farooq's team at our <strong id="elig-routed-location"></strong>.
        </p>
        <p class="text-gray-500 text-sm">A clinical coordinator will contact you shortly if you match an active protocol.</p>
      </div>

      <form id="elig-form">
        <!-- Honeypot field to prevent spam -->
        <input type="text" name="_honey" style="display:none" />
        <input type="hidden" name="_captcha" value="false" />

        <!-- Step 1 -->
        <div id="elig-step-1" class="space-y-6">
          <h3 class="text-xl font-bold text-brand-900 mb-6 flex items-center">
            <i data-lucide="map-pin" class="w-6 h-6 mr-2 text-accent-600"></i>
            Location & Basic Info
          </h3>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
            <input id="elig-zip" required type="text" maxlength="5"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all text-lg"
              placeholder="e.g. 75024" />
            <p class="text-xs text-gray-500 mt-2">Used to route you to the closest facility (Plano or Greenville).</p>
          </div>

          <button type="button" id="elig-next" class="w-full mt-8 bg-brand-900 text-white font-bold py-4 rounded-lg hover:bg-brand-800 active:scale-[0.98] transition-[background-color,transform] duration-150 flex items-center justify-center space-x-2">
            <span>Continue</span>
            <i data-lucide="arrow-right" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- Step 2 -->
        <div id="elig-step-2" class="space-y-6 hidden">
          <div class="bg-accent-50 border border-accent-200 p-4 rounded-lg mb-6 flex items-start">
            <i data-lucide="map-pin" class="w-5 h-5 text-accent-600 mr-3 flex-shrink-0 mt-0.5"></i>
            <p class="text-sm text-accent-900">
              Based on your zip code, you will be routed to our <strong id="elig-routed-location-2"></strong>.
            </p>
          </div>

          <h3 class="text-xl font-bold text-brand-900 mb-6 flex items-center">
            <i data-lucide="activity" class="w-6 h-6 mr-2 text-accent-600"></i>
            Contact Info
          </h3>
          <p class="text-sm text-gray-500 -mt-4">A clinical coordinator will call you to complete the rest of your intake.</p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input required type="text" name="firstName" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input required type="text" name="lastName" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input required type="tel" name="phone" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input required type="email" name="email" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all" />
          </div>

          <div class="flex space-x-4 mt-8">
            <button type="button" id="elig-back" class="w-1/3 bg-gray-100 text-gray-700 font-bold py-4 rounded-lg hover:bg-gray-200 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 transition-[background-color,transform] duration-150">
              Back
            </button>
            <button type="submit" id="elig-submit" class="w-2/3 bg-brand-900 text-white font-bold py-4 rounded-lg hover:bg-brand-800 active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 transition-[background-color,transform] duration-150 flex items-center justify-center space-x-2">
              <span id="elig-submit-label">Submit Securely</span>
              <i data-lucide="check-circle" id="elig-submit-icon" class="w-5 h-5"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
<?php include __DIR__ . '/includes/footer.php'; ?>
