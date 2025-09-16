# @sjsf/basic-theme

Basic theme for [svelte-jsonschema-form](https://github.com/x0k/svelte-jsonschema-form)

- [Documentation](https://x0k.github.io/svelte-jsonschema-form/themes/basic/)
- [Playground](https://x0k.github.io/svelte-jsonschema-form/playground2/)

## Installation

```shell
npm install @sjsf/form @sjsf/basic-theme
```

## Usage

```svelte
<script lang="ts">
  import { createForm } from '@sjsf/form';
  import { theme } from '@sjsf/basic-theme';

  const form = createForm({
    theme,
    ...
  })
</script>
```

## License

MIT
