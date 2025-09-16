# @sjsf/radix-icons

The [svelte-radix](https://github.com/shinokada/svelte-radix) based icons set for [svelte-jsonschema-form](https://github.com/x0k/svelte-jsonschema-form).

- [Documentation](https://x0k.github.io/svelte-jsonschema-form/guides/labels-and-icons/#usage)
- [Playground](https://x0k.github.io/svelte-jsonschema-form/playground2/)

## Installation

```shell
npm install @sjsf/form @sjsf/radix-icons
```

## Usage

```svelte
<script lang="ts">
  import { createForm } from '@sjsf/form';
  import { icons } from '@sjsf/radix-icons';

  const form = createForm({
    icons,
    ...
  })
</script>
```

## License

MIT
