<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="sakura.css">
<title>WePledge.to</title>

<header>
    <h1>WePledge.to</h1>
    <p>Coordination problems made easy!</p>
</header>

<ul>
    <li>Step 1: Think of a goal or project that requires collective action to succeed</li>
    <li>Step 2: Pick a threshold to trigger the action, and (optionally) an expiration date</li>
    <li>Step 3: Convince your friends to pledge to support the project if it reaches the threshold</li>
</ul>

<hr>

<p>I pledge to <input size="40" placeholder="move to Vermont"> if <input type="number" placeholder=5 min=1 max=999999> other people pledge to do the same by <input type="date" value=<?php echo date("Y-m-d", strtotime("1 week")); ?> min=<?= date("Y-m-d"); ?>>.<button style="float: right">Pledge ›</button></p>