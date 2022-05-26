# github-action-json-file-properties

Read JSON file and set properties to `output` of github action `steps`.

## Usage

Examples:

Get properties

```yaml
---
- name: get properties
  id: yaml_properties
  uses: EuphoricSystems/github-action-yaml-file-properties@v1.1.0
  with:
    file_path: "sample.yml"

- run: |
    echo ${{steps.yaml_properties.outputs.name}}
    echo ${{steps.yaml_properties.outputs.version}}
```

Get a specified property **value** with `prop_path`

```yaml
---
- name: get specified property
  id: repository_type
  uses: EuphoricSystems/github-action-yaml-file-properties@v1.1.0
  with:
    file_path: "sample.yml"
    prop_path: "repository.type"

- run: |
    echo ${{steps.repository_type.outputs.value}}
```
