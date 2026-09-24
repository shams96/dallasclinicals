<?php
$pageTitle = 'Admin — Dallas Clinicals';
$pageScript = '/assets/js/admin.js';
include __DIR__ . '/includes/header.php';
?>
<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 w-full">
  <div class="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <div class="bg-brand-900 px-6 py-8 text-center">
      <h2 class="text-2xl font-display font-bold text-white">Admin Portal</h2>
      <p class="text-accent-400 text-sm mt-1">Dallas Clinicals Content Manager</p>
    </div>

    <div class="p-6">
      <div id="admin-loading" class="flex items-center justify-center py-8">
        <i data-lucide="loader-2" class="w-8 h-8 animate-spin text-brand-900"></i>
      </div>

      <div id="admin-signed-out" class="text-center py-8 hidden">
        <p class="text-gray-600 mb-6">Please sign in to manage website content.</p>
        <button id="admin-login" type="button" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-900 hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-900">
          Sign in with Google
        </button>
      </div>

      <div id="admin-signed-in" class="space-y-6 hidden">
        <div class="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <p class="text-sm font-medium text-gray-900">Logged in as</p>
            <p id="admin-email" class="text-sm text-gray-500"></p>
          </div>
          <button id="admin-logout" type="button" class="text-gray-400 hover:text-red-500 transition-colors" title="Log out">
            <i data-lucide="log-out" class="w-5 h-5"></i>
          </button>
        </div>

        <div id="admin-unauthorized" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm flex items-start hidden">
          <i data-lucide="alert-circle" class="w-5 h-5 mr-2 flex-shrink-0 mt-0.5"></i>
          <p>You do not have admin privileges. Only the site admin account can make changes.</p>
        </div>

        <div>
          <h3 class="text-lg font-medium text-gray-900 mb-4">Update PI Photo</h3>

          <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-accent-500 transition-colors relative">
            <div class="space-y-1 text-center">
              <i data-lucide="upload" id="admin-upload-icon" class="mx-auto h-12 w-12 text-gray-400"></i>
              <i data-lucide="loader-2" id="admin-uploading-icon" class="mx-auto h-12 w-12 text-brand-900 animate-spin hidden"></i>
              <div class="flex text-sm text-gray-600 justify-center">
                <label for="admin-file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-brand-900 hover:text-brand-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-900">
                  <span>Upload a file</span>
                  <input id="admin-file-upload" name="file-upload" type="file" accept="image/*" class="sr-only" />
                </label>
              </div>
              <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        <div id="admin-message" class="px-4 py-3 rounded-md text-sm flex items-start hidden">
          <i data-lucide="check-circle" id="admin-message-icon-success" class="w-5 h-5 mr-2 flex-shrink-0 mt-0.5 hidden"></i>
          <i data-lucide="alert-circle" id="admin-message-icon-error" class="w-5 h-5 mr-2 flex-shrink-0 mt-0.5 hidden"></i>
          <p id="admin-message-text"></p>
        </div>
      </div>
    </div>
  </div>
</div>
<?php include __DIR__ . '/includes/footer.php'; ?>
