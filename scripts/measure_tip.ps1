Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile('o:\Desarrollo\Amalia\public\assets\home\plumon.png')
Write-Host "Width: $($bmp.Width) Height: $($bmp.Height)"

$minX = $bmp.Width
$minY = $bmp.Height
$maxX = 0
$maxY = 0

for ($x = 0; $x -lt $bmp.Width; $x++) {
    for ($y = 0; $y -lt $bmp.Height; $y++) {
        $pixel = $bmp.GetPixel($x, $y)
        if ($pixel.A -gt 30) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}
Write-Host "Bounding box non-transparent: minX=$minX maxX=$maxX minY=$minY maxY=$maxY"

for ($x = $minX; $x -lt ($minX + 10); $x++) {
    $yList = @()
    for ($y = 0; $y -lt $bmp.Height; $y++) {
        $pixel = $bmp.GetPixel($x, $y)
        if ($pixel.A -gt 50) {
            $yList += $y
        }
    }
    if ($yList.Count -gt 0) {
        $avgY = ($yList | Measure-Object -Average).Average
        Write-Host "X=$x -> Y from $($yList[0]) to $($yList[-1]) (center Y: $avgY)"
    }
}
$bmp.Dispose()
