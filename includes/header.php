<?php
/**
 * Shared <head>, top bar, and nav for every page.
 * Each page sets $pageTitle before including this file.
 */
require_once __DIR__ . '/config.php';
$pageTitle = $pageTitle ?? 'Dallas Clinicals';
$currentPage = basename($_SERVER['SCRIPT_NAME']);

$navLinks = [
    'sponsors.php' => 'For Sponsors',
    'patients.php' => 'For Patients',
    'locations.php' => 'Locations',
    'about.php' => 'About Us',
];
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><?= htmlspecialchars($pageTitle) ?></title>
  <link rel="stylesheet" href="/assets/css/style.css" />
  <link rel="stylesheet" href="/assets/css/animations.css" />
  <script>
    window.APP_CONFIG = <?= json_encode([
        'firebase' => FIREBASE_CONFIG,
        'notifyUrl' => NOTIFY_URL,
        'adminEmail' => ADMIN_EMAIL,
    ]) ?>;
  </script>
</head>
<body class="min-h-screen flex flex-col font-sans">
  <!-- Top Bar - Contact & Lang -->
  <div class="bg-brand-900 text-white text-xs py-2 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
    <div class="flex items-center space-x-4">
      <span class="hidden sm:inline-flex items-center">
        <i data-lucide="map-pin" class="w-3 h-3 mr-1 text-accent-500"></i>
        Plano &amp; Greenville, TX
      </span>
      <span class="text-gray-400">|</span>
      <a href="tel:+12147143597" class="hover:text-accent-400 transition-colors">214-714-3597</a>
    </div>
    <button id="lang-toggle" type="button" class="flex items-center space-x-1 hover:text-accent-400 transition-colors font-medium">
      <i data-lucide="globe" class="w-3 h-3"></i>
      <span id="lang-label">EN</span>
    </button>
  </div>

  <!-- Main Navigation -->
  <header class="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-20">
        <div class="flex items-center">
          <a href="/index.php" class="flex items-center space-x-2 group">
            <div class="w-10 h-10 bg-brand-900 rounded-lg flex items-center justify-center text-accent-500 font-display font-bold text-xl group-hover:bg-brand-800 transition-colors">DC</div>
            <div class="flex flex-col">
              <span class="font-display font-bold text-xl leading-tight text-brand-900 tracking-tight">Dallas Clinicals</span>
              <span class="text-[10px] uppercase tracking-widest text-accent-600 font-semibold">Research Center</span>
            </div>
          </a>
        </div>

        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center space-x-8">
          <?php foreach ($navLinks as $href => $label): ?>
            <a href="/<?= $href ?>" class="text-sm font-medium text-gray-600 hover:text-brand-900 transition-colors<?= $currentPage === $href ? ' text-brand-900' : '' ?>"><?= $label ?></a>
          <?php endforeach; ?>
          <a href="/check-eligibility.php" class="bg-brand-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-brand-800 transition-all shadow-md hover:shadow-lg flex items-center group">
            Check Eligibility
            <i data-lucide="chevron-right" class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"></i>
          </a>
        </nav>

        <!-- Mobile Menu Button -->
        <div class="flex items-center md:hidden">
          <button id="mobile-menu-btn" type="button" class="text-gray-600 hover:text-brand-900 focus:outline-none">
            <i data-lucide="menu" id="icon-menu-open" class="w-6 h-6"></i>
            <i data-lucide="x" id="icon-menu-close" class="w-6 h-6 hidden"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Nav -->
    <div id="mobile-nav" class="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg hidden">
      <div class="px-4 pt-2 pb-6 space-y-1">
        <?php foreach ($navLinks as $href => $label): ?>
          <a href="/<?= $href ?>" class="block px-3 py-3 text-base font-medium text-gray-700 hover:text-brand-900 hover:bg-gray-50 rounded-md"><?= $label ?></a>
        <?php endforeach; ?>
        <a href="/check-eligibility.php" class="block mt-4 w-full text-center bg-brand-900 text-white px-5 py-3 rounded-md text-base font-medium hover:bg-brand-800">Check Eligibility</a>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="flex-grow flex flex-col relative">
