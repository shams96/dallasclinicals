<?php
$pageTitle = 'For Patients — Dallas Clinicals';
include __DIR__ . '/includes/header.php';

$phases = [
    ['phase' => 'Phase I', 'title' => 'Safety & Dosage', 'desc' => 'Initial testing with healthy local DFW volunteers to determine safety, side effects, and correct dosage.', 'color' => 'bg-blue-50 border-blue-200 text-blue-800'],
    ['phase' => 'Phase II', 'title' => 'Efficacy & Side Effects', 'desc' => 'Focused trials for patients with specific conditions to see if the treatment is effective and further evaluate safety.', 'color' => 'bg-accent-50 border-accent-200 text-accent-800'],
    ['phase' => 'Phase III', 'title' => 'Large Scale Efficacy', 'desc' => 'Comparing the new treatment to standard existing treatments across a large diverse demographic in Collin and Hunt counties.', 'color' => 'bg-purple-50 border-purple-200 text-purple-800'],
    ['phase' => 'Phase IV', 'title' => 'Post-Marketing', 'desc' => 'Ongoing surveillance after FDA approval to monitor long-term effects and optimal usage.', 'color' => 'bg-green-50 border-green-200 text-green-800'],
];
?>
<div class="w-full">
  <section class="bg-brand-900 text-white py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto text-center">
      <h1 class="anim-in text-4xl md:text-5xl font-display font-bold mb-6">The Patient Experience</h1>
      <p class="anim-in delay-1 text-xl text-gray-300 max-w-3xl mx-auto">
        Your participation drives the future of medicine. Discover how clinical trials work and our commitment to your safety.
      </p>
    </div>
  </section>

  <!-- Trust & Safety -->
  <section class="py-20 bg-white px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-display font-bold text-brand-900 mb-4">A Culture of Responsibility</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">Under the medical oversight of Dr. Hassan Farooq, MD, patient safety is our absolute highest priority.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center p-6">
          <i data-lucide="shield-check" class="w-12 h-12 text-accent-600 mx-auto mb-4"></i>
          <h3 class="text-xl font-bold text-brand-900 mb-2">FDA Compliant</h3>
          <p class="text-gray-600">Strict adherence to all FDA regulations and Good Clinical Practices (GCP).</p>
        </div>
        <div class="text-center p-6">
          <i data-lucide="heart" class="w-12 h-12 text-red-500 mx-auto mb-4"></i>
          <h3 class="text-xl font-bold text-brand-900 mb-2">Voluntary Participation</h3>
          <p class="text-gray-600">Your participation is 100% voluntary. You have the ethical right to withdraw at any time.</p>
        </div>
        <div class="text-center p-6">
          <i data-lucide="check-circle" class="w-12 h-12 text-green-500 mx-auto mb-4"></i>
          <h3 class="text-xl font-bold text-brand-900 mb-2">IRB Oversight</h3>
          <p class="text-gray-600">Every study is reviewed by an Independent Review Board to protect your rights and welfare.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Phase Education -->
  <section class="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
    <div class="max-w-5xl mx-auto">
      <h2 class="text-3xl font-display font-bold text-brand-900 mb-12 text-center">Understanding Clinical Trial Phases</h2>

      <div class="space-y-6">
        <?php foreach ($phases as $i => $p): ?>
          <div class="reveal reveal-x p-6 rounded-2xl border <?= $p['color'] ?> flex flex-col md:flex-row items-start md:items-center gap-6" style="--reveal-i:<?= $i ?>">
            <div class="flex-shrink-0 w-24 h-24 bg-white rounded-xl flex items-center justify-center font-display font-bold text-xl shadow-sm">
              <?= htmlspecialchars($p['phase']) ?>
            </div>
            <div>
              <h3 class="text-xl font-bold mb-2"><?= htmlspecialchars($p['title']) ?></h3>
              <p class="opacity-90"><?= htmlspecialchars($p['desc']) ?></p>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>
</div>
<?php include __DIR__ . '/includes/footer.php'; ?>
