$hugoVersion = "0.37.1"
$hugoDownloadPath = "https://github.com/gohugoio/hugo/releases/download/v{0}/hugo_{0}_Windows-64bit.zip" -f $hugoVersion

function Get-HugoPath($version=$hugoVersion) {
	return "D:\home\site\deployments\tools\hugo\v$version\"
}

function Get-HugoExe($version=$hugoVersion) {
	return Join-Path (Get-HugoPath($version)) "hugo.exe"
}

function Install-Hugo($version=$hugoVersion, $force=$false) {
	# Check if Hugo is installed
	$hugoPath = Get-HugoPath($version)
	$isInstalled = Test-Path (Get-HugoExe($version))

	if(-not $isInstalled -or $force) {
		# Download and install Hugo
		mkdir $hugoPath -Force
		Push-Location $hugoPath

		Write-Output "Downloading Hugo v$hugoVersion"

		# See this answer on StackOverflow:
		#    https://stackoverflow.com/a/48030563
		# [Net.ServicePointManager]::SecurityProtocol = "tls12, tls11, tls"
		# Invoke-WebRequest -OutFile hugo.zip -Uri $hugoDownloadPath

		(New-Object System.Net.WebClient).DownloadFile($hugoDownloadPath, "hugo.zip")

		Write-Output "Installing Hugo..."
		d:\7zip\7za x hugo.zip
		Write-Output "Done!"
		Pop-Location
	} else {
		Write-Output "Skipping Hugo installation."
	}
}

function Invoke-SiteBuild($version=$hugoVersion) {
	# Build the site
	$hugoPath = Get-HugoPath($version)
	Push-Location $hugoPath
	Write-Output "Building site..."
	.\hugo.exe -d D:\home\site\wwwroot
	Write-Output "Done!"
	Pop-Location
}
