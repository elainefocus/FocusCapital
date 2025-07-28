let breadcrumbHtml = "";

breadcrumbHtml += `<a href="/" style="color:#787878; font-size:14px; text-decoration:none;">Home</a> / `;
breadcrumbHtml += `<a href="/Properties" style="color:#787878; font-size:14px; text-decoration:none;">Properties</a> / `;

const currentItem = $w("#dynamicDataset").getCurrentItem();
const title = currentItem.propertyName;

breadcrumbHtml += `<span style="color:#787878; font-size:14px;">${title}</span>`;

$w("#breadcrumbText").html = breadcrumbHtml;
