/* Djaunt typeahead controller — pairs with typeahead.css. Framework-free,
   one DjTypeahead instance per .dj-typeahead root. Mirrors mealeo's
   Typeahead.tsx: frequent options shown before typing, arrow-key highlight,
   Enter/Tab commits the highlighted option (Tab also lets the browser's own
   focus advance run, so committing and tabbing away happen in one
   keystroke), and an optional async onCreate for a "Create <query>" row. */

class DjTypeahead {
  /**
   * @param {HTMLElement} root - a `.dj-typeahead` element containing
   *   `.dj-typeahead-chips`, `.dj-typeahead-field` > `.dj-typeahead-input` +
   *   `.dj-typeahead-listbox` (see the README markup contract).
   * @param {object} opts
   * @param {{id:string,name:string,kind?:string}[]} opts.options
   * @param {'multi'|'single'} [opts.mode]
   * @param {object[]|object|null} [opts.selected]
   * @param {(selected:object[]|object|null)=>void} [opts.onChange]
   * @param {(name:string)=>Promise<object>} [opts.onCreate]
   * @param {'tag'|'category'} [opts.variant]
   * @param {number} [opts.frequentCount] - how many options to show before typing
   * @param {boolean} [opts.disabled]
   * @param {boolean} [opts.autoFocus]
   * @param {string} [opts.placeholder]
   */
  constructor(root, opts = {}) {
    this.root = root;
    this.options = opts.options || [];
    this.mode = opts.mode || 'multi';
    this.selected = opts.selected ?? (this.mode === 'multi' ? [] : null);
    this.onChange = opts.onChange || (() => {});
    this.onCreate = opts.onCreate || null;
    this.variant = opts.variant || 'tag';
    this.frequentCount = opts.frequentCount || 8;
    this.disabled = Boolean(opts.disabled);

    this.query = '';
    this.isCreating = false;
    this.highlightedIndex = 0;
    this._focused = false;

    this.chipsEl = root.querySelector('.dj-typeahead-chips');
    this.fieldEl = root.querySelector('.dj-typeahead-field');
    this.inputEl = root.querySelector('.dj-typeahead-input');
    this.listEl = root.querySelector('.dj-typeahead-listbox');

    if (opts.placeholder) this.inputEl.placeholder = opts.placeholder;
    this.inputEl.disabled = this.disabled;

    this.inputEl.addEventListener('input', (e) => {
      this.query = e.target.value;
      this.highlightedIndex = 0;
      this.render();
    });
    this.inputEl.addEventListener('focus', () => {
      this._focused = true;
      this.render();
    });
    this.inputEl.addEventListener('blur', () => {
      // Deferred so a mousedown on an option (which preventDefault()s to
      // keep focus) still gets to commit before the list disappears.
      setTimeout(() => {
        this._focused = false;
        this.render();
      }, 0);
    });
    this.inputEl.addEventListener('keydown', (e) => this._handleKeyDown(e));

    this.render();
    if (opts.autoFocus) this.inputEl.focus();
  }

  setOptions(options) {
    this.options = options;
    this.render();
  }

  setSelected(selected) {
    this.selected = selected;
    this.render();
  }

  setDisabled(disabled) {
    this.disabled = disabled;
    this.inputEl.disabled = disabled;
    this.render();
  }

  _matches() {
    const q = this.query.trim().toLowerCase();
    if (!q) return this.options.slice(0, this.frequentCount);
    return this.options.filter((o) => o.name.toLowerCase().includes(q));
  }

  _selectedIds() {
    if (this.mode === 'multi') return new Set(this.selected.map((o) => o.id));
    return new Set(this.selected ? [this.selected.id] : []);
  }

  _availableMatches() {
    const selectedIds = this._selectedIds();
    return this._matches().filter((o) => !selectedIds.has(o.id));
  }

  _showCreateOption() {
    const q = this.query.trim();
    if (!this.onCreate || !q) return false;
    return !this._matches().some((o) => o.name.toLowerCase() === q.toLowerCase());
  }

  _isOpen() {
    return this._focused && (this.query.trim().length > 0 || this._matches().length > 0);
  }

  _commitOption(option) {
    if (this.mode === 'multi') {
      if (!this._selectedIds().has(option.id)) {
        this.selected = [...this.selected, option];
        this.onChange(this.selected);
      }
    } else {
      this.selected = option;
      this.onChange(this.selected);
    }
    this.query = '';
  }

  _removeOption(id) {
    this.selected = this.mode === 'multi' ? this.selected.filter((o) => o.id !== id) : null;
    this.onChange(this.selected);
    this.render();
  }

  async _handleCreate() {
    const q = this.query.trim();
    if (!this.onCreate || !q || this.isCreating) return;
    this.isCreating = true;
    this.render();
    try {
      const created = await this.onCreate(q);
      this._commitOption(created);
    } finally {
      this.isCreating = false;
      this.render();
    }
  }

  // Returns whether a selection/create was actually committed, so callers
  // (Enter) can decide whether to also advance focus.
  _commitHighlighted() {
    const matches = this._availableMatches();
    if (this.highlightedIndex < matches.length) {
      this._commitOption(matches[this.highlightedIndex]);
      return true;
    }
    if (this._showCreateOption()) {
      void this._handleCreate();
      return true;
    }
    return false;
  }

  _handleKeyDown(e) {
    const matches = this._availableMatches();
    const total = matches.length + (this._showCreateOption() ? 1 : 0);

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      if (!this._isOpen() || total === 0) return;
      e.preventDefault();
      this.highlightedIndex =
        e.key === 'ArrowDown'
          ? (this.highlightedIndex + 1) % total
          : (this.highlightedIndex - 1 + total) % total;
      this.render();
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!this._isOpen()) return;
      if (this._commitHighlighted()) this._focusNext();
      return;
    }
    if (e.key === 'Tab' && !e.shiftKey) {
      if (!this._isOpen()) return;
      this._commitHighlighted();
    }
  }

  _focusNext() {
    const container = this.inputEl.closest('form') || document.body;
    const focusable = Array.from(
      container.querySelectorAll('input, select, textarea, button, [tabindex]'),
    ).filter((el) => !el.disabled && el.tabIndex !== -1 && el.offsetParent !== null);
    const index = focusable.indexOf(this.inputEl);
    if (index >= 0 && index + 1 < focusable.length) focusable[index + 1].focus();
  }

  render() {
    if (this.inputEl.value !== this.query) this.inputEl.value = this.query;

    this._renderChips();

    // Single-select with a value already chosen hides the input entirely.
    const showField = this.mode === 'multi' || !this.selected;
    this.fieldEl.hidden = !showField;
    if (!showField) {
      this.listEl.hidden = true;
      return;
    }

    this._renderListbox();
  }

  _renderChips() {
    const chipItems = this.mode === 'multi' ? this.selected : this.selected ? [this.selected] : [];
    this.chipsEl.hidden = chipItems.length === 0;
    this.chipsEl.innerHTML = '';
    for (const option of chipItems) {
      const chip = document.createElement('span');
      chip.className = 'dj-typeahead-chip' + (this.variant === 'category' ? ' dj-typeahead-chip-category' : '');
      const label = document.createTextNode(option.name);
      chip.appendChild(label);
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'dj-typeahead-chip-remove';
      removeBtn.setAttribute('aria-label', `Remove ${option.name}`);
      removeBtn.tabIndex = -1;
      removeBtn.textContent = '×';
      removeBtn.disabled = this.disabled;
      removeBtn.addEventListener('click', () => this._removeOption(option.id));
      chip.appendChild(removeBtn);
      this.chipsEl.appendChild(chip);
    }
  }

  _renderListbox() {
    const matches = this._availableMatches();
    const showCreate = this._showCreateOption();
    const isOpen = this._isOpen();

    this.listEl.hidden = !isOpen;
    this.listEl.innerHTML = '';
    if (!isOpen) return;

    matches.forEach((option, index) => {
      const li = document.createElement('li');
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', String(index === this.highlightedIndex));

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className =
        'dj-typeahead-option' + (index === this.highlightedIndex ? ' dj-typeahead-option-active' : '');
      btn.addEventListener('mousedown', (e) => e.preventDefault());
      btn.addEventListener('mouseenter', () => {
        this.highlightedIndex = index;
        this.render();
      });
      btn.addEventListener('click', () => {
        this._commitOption(option);
        this.render();
      });

      const label = document.createElement('span');
      label.className = 'dj-typeahead-option-label';
      label.textContent = option.name;
      btn.appendChild(label);

      if (option.kind) {
        const kind = document.createElement('span');
        kind.className = 'dj-typeahead-option-kind';
        kind.textContent = option.kind;
        btn.appendChild(kind);
      }

      li.appendChild(btn);
      this.listEl.appendChild(li);
    });

    if (showCreate) {
      const li = document.createElement('li');
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', String(matches.length === this.highlightedIndex));

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className =
        'dj-typeahead-option dj-typeahead-option-create' +
        (matches.length === this.highlightedIndex ? ' dj-typeahead-option-active' : '');
      btn.disabled = this.isCreating;
      btn.textContent = this.isCreating ? 'Creating…' : `Create "${this.query.trim()}"`;
      btn.addEventListener('mousedown', (e) => e.preventDefault());
      btn.addEventListener('mouseenter', () => {
        this.highlightedIndex = matches.length;
        this.render();
      });
      btn.addEventListener('click', () => this._handleCreate());

      li.appendChild(btn);
      this.listEl.appendChild(li);
    }
  }
}
