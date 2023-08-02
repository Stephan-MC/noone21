import { Injectable, Inject, isDevMode } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { memoize } from '@alyle/ui';
import { Platform } from '@angular/cdk/platform';


@Injectable({
  providedIn: 'root'
})
export class SEOService {
  readonly origin = this.dom.URL;
  /**
   * Equal to URL but with memoize
   */
  readonly url =this.origin;

  constructor(
    @Inject(DOCUMENT) private dom: Document,
    private titleService: Title,
    private metaService: Meta,
    private router: Router,
    private _platform: Platform
  ) {

    
   }

  updateCanonicalUrl(url?: string) {
    const head = this.dom.getElementsByTagName('head')[ 0 ];
    let element: HTMLLinkElement | null = head.querySelector(`link[rel='canonical']`) || null;
    if (!url) {
      if (element) {
        head.removeChild(element);
      }
      return;
    }
    if (element == null) {
      element = this.dom.createElement('link');
      head.appendChild(element);
    }
    element.setAttribute('rel', 'canonical');
    element.setAttribute('href', url);
  }

  /**
   * Tell search engine crawlers whether to index this page
   */
  setNoIndex(val: boolean) {
    if (val) {
      this.metaService.addTag({ name: 'robots', content: 'index' });
    } else {
      this.metaService.removeTag('name="robots"');
    }
  }
  setMetaTags(metakeywords,metaDes){
    this.metaService.removeTag('name="keywords"');
    this.metaService.removeTag('name="Description"');
    this.metaService.addTag({ name: 'keywords', content: metakeywords });
    //this.metaService.addTag({ name: 'content', content: metaContent });
    this.metaService.addTag({ name: 'Description', content: metaDes });
  }
  setTitle(val?: string) {
    this.titleService.setTitle(val
      ? val
      : 'parga');
    if (val || this.router.url === '/') {
      this.updateCanonicalUrl(`${this.origin}`);
    } else {
      this.updateCanonicalUrl();
    }

    // if (this._platform.isBrowser && !isDevMode()) {
    //   ga('set', 'page', this.router.url || '/');
    //   ga('send', 'pageview');
    // }
  }

}
