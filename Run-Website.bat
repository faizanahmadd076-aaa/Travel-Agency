@echo off
title PakVistas Expeditions - Local Web Server
echo ============================================================
echo   PakVistas Expeditions - Local Server
echo ============================================================
echo.
echo Starting local web server at http://localhost:5500 ...
echo This allows automated email sending to muhammadfaizanahmad10@gmail.com!
echo.
echo Press Ctrl+C in this window anytime to stop the server.
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command "& { $port = 5500; $listener = New-Object System.Net.HttpListener; $listener.Prefixes.Add('http://localhost:' + $port + '/'); $listener.Start(); Write-Host 'Server running at http://localhost:5500'; Start-Process 'http://localhost:5500'; while ($listener.IsListening) { $context = $listener.GetContext(); $request = $context.Request; $response = $context.Response; $path = $request.Url.LocalPath.TrimStart('/'); if ([string]::IsNullOrEmpty($path)) { $path = 'index.html' }; $filePath = Join-Path (Get-Location) $path; if (Test-Path $filePath) { $bytes = [System.IO.File]::ReadAllBytes($filePath); $ext = [System.IO.Path]::GetExtension($filePath).ToLower(); $contentType = 'text/html'; if ($ext -eq '.css') { $contentType = 'text/css' } elseif ($ext -eq '.js') { $contentType = 'application/javascript' } elseif ($ext -eq '.png') { $contentType = 'image/png' } elseif ($ext -eq '.jpg' -or $ext -eq '.jpeg') { $contentType = 'image/jpeg' }; $response.ContentType = $contentType; $response.ContentLength64 = $bytes.Length; $response.OutputStream.Write($bytes, 0, $bytes.Length) } else { $response.StatusCode = 404 }; $response.OutputStream.Close() } }"
