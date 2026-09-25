  </main>

  <!-- Footer -->
  <footer class="bg-brand-900 text-white pt-16 pb-8 border-t-4 border-accent-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div>
          <div class="flex items-center space-x-2 mb-6">
            <div class="w-8 h-8 bg-white rounded flex items-center justify-center text-brand-900 font-display font-bold text-lg">DC</div>
            <span class="font-display font-bold text-xl tracking-tight">Dallas Clinicals</span>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed mb-6">
            The premier high-tech clinical research hub in DFW, bridging the Plano tech corridor with Greenville's community reach for Phase 1-4 trials.
          </p>
          <div class="text-sm">
            <p class="font-semibold text-accent-400 mb-1">PI Oversight:</p>
            <p class="text-gray-300">Hassan Farooq, MD</p>
          </div>
        </div>

        <div>
          <h3 class="font-display font-semibold text-lg mb-6">Locations</h3>
          <ul class="space-y-4 text-sm text-gray-400">
            <li>
              <strong class="text-white block mb-1">Plano Office (Collin County)</strong>
              123 Tech Corridor Blvd, Suite 100<br />Plano, TX 75024
            </li>
            <li>
              <strong class="text-white block mb-1">Greenville Office (Hunt County)</strong>
              456 Medical Center Dr<br />Greenville, TX 75401
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-display font-semibold text-lg mb-6">Therapeutic Areas</h3>
          <ul class="space-y-2 text-sm text-gray-400">
            <li>Dermatology</li>
            <li>Endocrinology</li>
            <li>Metabolism (GLP-1/Obesity)</li>
            <li>Respiratory</li>
            <li>Infectious Diseases</li>
          </ul>
        </div>

        <div>
          <h3 class="font-display font-semibold text-lg mb-6">Contact Leadership</h3>
          <div class="bg-brand-800 p-4 rounded-lg border border-brand-700">
            <p class="text-xs text-gray-400 mb-2">Inquiries regarding facility capabilities or protocol implementation:</p>
            <p class="font-medium text-white mb-1">Shams Islam</p>
            <p class="text-xs text-accent-400 mb-3">Director of Research</p>
            <a href="mailto:research@dallasclinicals.com" class="inline-block bg-white text-brand-900 px-4 py-2 rounded text-sm font-medium hover:bg-gray-100 transition-colors w-full text-center">Contact Director</a>
          </div>
        </div>
      </div>

      <div class="border-t border-brand-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>&copy; <?= date('Y') ?> Dallas Clinicals Research Center. All rights reserved.</p>
        <div class="flex space-x-4 mt-4 md:mt-0">
          <a href="/privacy.php" class="hover:text-white transition-colors">Privacy Policy</a>
          <a href="/terms.php" class="hover:text-white transition-colors">Terms of Service</a>
          <a href="/hipaa.php" class="hover:text-white transition-colors">HIPAA Compliance</a>
        </div>
      </div>
    </div>
  </footer>

  <script src="https://unpkg.com/lucide@0.462.0/dist/umd/lucide.js"></script>
  <script src="/assets/js/main.js"></script>
  <?php if (!empty($pageScript)): ?>
    <script type="module" src="<?= htmlspecialchars($pageScript) ?>"></script>
  <?php endif; ?>
</body>
</html>
